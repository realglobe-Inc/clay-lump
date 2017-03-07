/**
 * Mix merge support
 * @function mergeMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const { LogPrefixes } = require('clay-constants')
const { LUMP_PREFIX } = LogPrefixes
const clayResourceName = require('clay-resource-name')
const { decorate } = require('clay-entity')
const isLump = require('../is_lump')
const { clone } = require('asobj')
const co = require('co')
const AsLogger = require('aslogger')

/** @lends mergeMix */
function mergeMix (BaseClass) {
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
    merge (lump, options = {}) {
      const s = this
      let logger = new AsLogger({
        prefix: LUMP_PREFIX
      })
      return co(function * () {
        let startAt = new Date()
        logger.info(`Start merging with lump "${lump.name}"...`)
        if (!isLump(lump)) {
          throw new Error(`${LUMP_PREFIX} merge target must be an instance of lump!`)
        }
        let mergingResources = yield lump.resources({ annotate: true })
        let results = {}
        for (let mergingResource of mergingResources) {
          let result = yield s.mergeResource(mergingResource)
          let { resourceName, created, merged, skipped } = result
          results[ resourceName ] = result
          logger.trace(
            `Resource Merged: "${resourceName}" ( created: ${created.length} , merged: ${merged.length}, skipped: ${skipped.length} )`
          )
        }
        let took = new Date() - startAt
        logger.info(`...merge with "${lump.name}" done! (${took}ms)`)
        return results
      })
    }

    /**
     * Merge a resource
     * @param {ClayResource} resource - Resource to merge
     * @returns {Promise}
     */
    mergeResource (resource) {
      const s = this
      return co(function * () {
        let resourceName = clayResourceName(resource)
        let [ created, merged, skipped ] = [ [], [], [] ]
        let ownResource = yield s.resource(resourceName, { annotate: true })
        let cursor = yield resource.cursor()
        for (let fetch of cursor) {
          let mergingEntity = yield fetch()
          let { id } = mergingEntity
          let attributes = decorate(mergingEntity).get()
          let ownEntity = yield ownResource.one(id)
          let hasOwn = ownEntity && String(ownEntity.id) === String(id)
          if (hasOwn) {
            if (ownEntity.$$at < mergingEntity.$$at) {
              yield ownResource.update(id, attributes)
              merged.push(id)
            } else {
              skipped.push(id)
            }
          } else {
            // Use resource.bounds#create instead of resource#create to set id
            yield ownResource.bounds.create(Object.assign({}, attributes, { id }))
            created.push(id)
          }
        }
        return { resourceName, created, merged, skipped }
      })
    }
  }

  return MergeMixed
}

module.exports = mergeMix
