/**
 * Mix resource support
 * @private
 * @function resourceMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const {LogPrefixes} = require('clay-constants')
const {fromDriver: resourceFromDriver} = require('clay-resource')
const clayResourceName = require('clay-resource-name')

/** @lends resourceMix */
function resourceMix (BaseClass) {
  /** @class */
  class ResourceMixed extends BaseClass {
    get $$resourceMixed () {
      return true
    }

    constructor () {
      super(...arguments)
      this._resources = {}
    }

    /**
     * Get a resource with name
     * @param {string|Object} resourceName - Name of resource
     * @param {Object} [options={}] - Optional settings
     * @param {boolean} [options.renew] - Use no cache
     * @returns {ClayResource}
     */
    resource (resourceName, options = {}) {
      let {renew = false, policy} = options
      resourceName = String(clayResourceName(resourceName))
      const {driver} = this
      if (renew) {
        delete this._resources[resourceName]
      }
      if (policy) {
        console.warn('`options.policy` is now deprecated. Use `ClayResource#policy` method instead.')
        this.registerPolicy(resourceName, policy)
      }
      let cached = this.getResource(resourceName)
      if (cached) {
        return cached
      }
      let resource = resourceFromDriver(driver, resourceName, {
        annotates: true,
        policy: this.getPolicy(resourceName)
      })
      this.setResource(resourceName, resource)
      return this.getResource(resourceName)
    }

    /**
     * Set resource with name
     * @param {string} resourceName - Name of resource
     * @param {ClayResource} resource - Resource to set
     * @returns {ResourceMixed} Returns this
     */
    setResource (resourceName, resource) {
      const {knownResources} = this
      for (const knownResource of knownResources) {
        knownResource.refs(resource)
        resource.refs(knownResource)
      }

      this._resources[String(clayResourceName(resourceName))] = resource
      return this
    }

    get knownResources () {
      return Object.keys(this._resources).map((name) => this._resources[name])
    }

    /**
     * Get resource by name
     * @param {string} resourceName - Name of resource
     * @returns {?ClayResource} Found resource
     */
    getResource (resourceName) {
      return this._resources[String(clayResourceName(resourceName))]
    }

    /**
     * Get all resource names
     * Return all resources
     * @returns {Promise.<string[]>}
     */
    async resourceNames () {
      const {driver} = this
      const resources = await driver.resources()
      return resources.map(({name, version}) =>
        String(clayResourceName({name, version}))
      )
    }
  }

  return ResourceMixed
}

module.exports = resourceMix
