/**
 * Mix resource support
 * @function resourceMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const { LogPrefixes } = require('clay-constants')
const clayResource = require('clay-resource')
const clayResourceName = require('clay-resource-name')
const co = require('co')

/** @lends resourceMix */
function resourceMix (BaseClass) {
  class ResourceMixed extends BaseClass {
    get $$resourceMixed () {
      return true
    }

    constructor () {
      super(...arguments)
      const s = this
      s._resources = {}
    }

    /**
     * Get a resource with name
     * @param {string|Object} resourceName - Name of resource
     * @param {Object} [options={}] - Optional settings
     * @returns {ClayResource}
     */
    resource (resourceName, options = {}) {
      const s = this
      resourceName = String(clayResourceName(resourceName))
      const { driver } = s
      let cached = s._resources[ resourceName ]
      if (cached) {
        return cached
      }
      const resource = clayResource.fromDriver(driver, resourceName, options)
      s._resources[ resourceName ] = resource
      return resource
    }

    /**
     * Get all resource names
     * Return all resources
     * @returns {Promise.<ClayResource[]>}
     */
    resourceNames () {
      const s = this
      return co(function * () {
        const { driver } = s
        let resources = yield driver.resources()
        return resources.map(({ name, version }) =>
          String(clayResourceName({ name, version }))
        )
      })
    }
  }

  return ResourceMixed
}

module.exports = resourceMix
