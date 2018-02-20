/**
 * Mix merge support
 * @private
 * @function mergeMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const {LogPrefixes} = require('clay-constants')
const {LUMP_PREFIX} = LogPrefixes
const clayResourceName = require('clay-resource-name')
const {decorate} = require('clay-entity')
const isLump = require('../is_lump')
const {clone} = require('asobj')
const AsLogger = require('aslogger')

/** @lends mergeMix */
function mergeMix (BaseClass) {
  /** @class */
  class MergeMixed extends BaseClass {
    get $$mergeMixed () {
      return true
    }

    /**
     * Merge another lump
     * @param {ClayLump} lump - Lump to merge
     * @param {Object} [options={}] - Optional settings
     * @returns {Promise}
     */
    async merge (lump, options = {}) {
      let logger = new AsLogger({
        prefix: LUMP_PREFIX
      })
      let startAt = new Date()
      logger.info(`Start merging with lump "${lump.name}"...`)
      if (!isLump(lump)) {
        throw new Error(`${LUMP_PREFIX} merge target must be an instance of lump!`)
      }
      let results = {}
      let resourceNames = await lump.resourceNames()
      for (let resourceName of resourceNames) {
        let resource = lump.resource(resourceName, {annotate: true})
        let result = await this.mergeResource(resource)
        let {created, merged, skipped} = result
        results[resourceName] = result
        logger.trace(
          `Resource Merged: "${resourceName}" ( created: ${created.length} , merged: ${merged.length}, skipped: ${skipped.length} )`
        )
      }
      let took = new Date() - startAt
      logger.info(`...merge with "${lump.name}" done! (${took}ms)`)
      return results
    }

    /**
     * Merge a resource
     * @param {ClayResource} resource - Resource to merge
     * @returns {Promise}
     */
    async mergeResource (resource) {
      const resourceName = clayResourceName(resource)
      const [created, merged, skipped] = [[], [], []]
      const ownResource = this.resource(resourceName, {annotate: true})
      let cursor = await resource.cursor()
      for (let fetch of cursor) {
        let mergingEntity = await fetch()
        let {id} = mergingEntity
        let attributes = decorate(mergingEntity).get()
        let ownEntity = await ownResource.one(id)
        let hasOwn = ownEntity && String(ownEntity.id) === String(id)
        if (hasOwn) {
          if (ownEntity.$$at < mergingEntity.$$at) {
            await ownResource.update(id, attributes)
            merged.push(id)
          } else {
            skipped.push(id)
          }
        } else {
          // Use resource.bounds#create instead of resource#create to set id
          await ownResource.bounds.create(Object.assign({}, attributes, {id}))
          created.push(id)
        }
      }
      return {resourceName, created, merged, skipped}
    }
  }

  return MergeMixed
}

module.exports = mergeMix
