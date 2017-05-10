/**
 * Mix resource support
 * @private
 * @function resourceMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const { LogPrefixes } = require('clay-constants')
const { fromDriver: resourceFromDriver } = require('clay-resource')
const clayResourceName = require('clay-resource-name')
const co = require('co')

/** @lends resourceMix */
function resourceMix (BaseClass) {
  /** @class */
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
     * @param {boolean} [options.renew] - Use no cache
     * @returns {ClayResource}
     */
    resource (resourceName, options = {}) {
      const s = this
      let { renew = false, policy } = options
      resourceName = String(clayResourceName(resourceName))
      const { driver } = s
      if (renew) {
        delete s._resources[ resourceName ]
      }
      if (policy) {
        console.warn('`options.policy` is now deprecated. Use `ClayResource#policy` method instead.')
        s.registerPolicy(resourceName, policy)
      }
      let cached = s.getResource(resourceName)
      if (cached) {
        return cached
      }
      let resource = resourceFromDriver(driver, resourceName, {
        annotates: true,
        policy: s.getPolicy(resourceName)
      })
      s.setResource(resourceName, resource)
      return s.getResource(resourceName)
    }

    /**
     * Set resource with name
     * @param {string} resourceName - Name of resource
     * @param {ClayResource} resource - Resource to set
     * @returns {ResourceMixed} Returns this
     */
    setResource (resourceName, resource) {
      const s = this
      const { knownResources } = s
      for (let knownResource of knownResources) {
        knownResource.refs(resource)
        resource.refs(knownResource)
      }

      s._resources[ String(clayResourceName(resourceName)) ] = resource
      return s
    }

    get knownResources () {
      const s = this
      return Object.keys(s._resources).map((name) => s._resources[ name ])
    }

    /**
     * Get resource by name
     * @param {string} resourceName - Name of resource
     * @returns {?ClayResource} Found resource
     */
    getResource (resourceName) {
      const s = this
      return s._resources[ String(clayResourceName(resourceName)) ]
    }

    /**
     * Get all resource names
     * Return all resources
     * @returns {Promise.<string[]>}
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
