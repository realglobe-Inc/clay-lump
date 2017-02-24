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
const isLump = require('../is_lump')
const { clone } = require('asobj')
const co = require('co')

/** @lends mergeMix */
function mergeMix (BaseClass) {
  class MergeMixed extends BaseClass {
    get $$mergeMixed () {
      return true
    }

    /**
     * Merge another lump
     * @param {ClayLump} lump - Lump to merge
     * @returns {Promise}
     */
    merge (lump) {
      const s = this
      return co(function * () {
        if (!isLump(lump)) {
          throw new Error(`${LUMP_PREFIX} merge target must be an instance of lump!`)
        }
        let mergingResources = yield lump.resources()
        let results = {}
        for (let mergingResource of mergingResources) {
          let result = yield s.mergeResource(mergingResource)
          let { resourceName } = result
          results[ resourceName ] = result
        }
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
        let ownResource = yield s.resource(resourceName)
        let cursor = yield resource.cursor()
        console.log('!cursor', cursor.length, resourceName)
        for (let fetch of cursor) {
          let mergingEntity = yield fetch()
          let { id } = mergingEntity
          let attributes = clone(mergingEntity, { without: [ 'id' ] })
          let ownEntity = !!(yield ownResource.one(id))
          if (ownEntity) {
            if (ownEntity.updatedAt < mergingEntity.updatedAt) {
              yield ownResource.update(id, attributes)
              merged.push(id)
            } else {
              skipped.push(id)
            }
          } else {
            yield ownResource.create(Object.assign({}, attributes, { id }))
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
