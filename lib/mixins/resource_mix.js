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
     * @param {string} resourceName - Name of resource
     * @returns {Promise.<ClayResource>}
     */
    resource (resourceName) {
      const s = this
      let { name, version } = clayResourceName(resourceName)
      return co(function * () {
        const { driver } = s
        let cached = s._resources[ resourceName ]
        if (cached) {
          return cached
        }
        const resource = clayResource.fromDriver(driver, resourceName)
        s._resources[ resourceName ] = resource
        return resource
      })
    }

    /**
     * List resources
     * Return all resources
     * @returns {Promise.<ClayResource[]>}
     */
    resources () {
      const s = this
      return co(function * () {
        const { driver } = s
        let resources = []
        for (let { name, version } of yield driver.resources()) {
          console.log(name)
          let resource = yield s.resource({ name, version })
          resources.push(resource)
        }
        return resources
      })
    }
  }

  return ResourceMixed
}

module.exports = resourceMix
