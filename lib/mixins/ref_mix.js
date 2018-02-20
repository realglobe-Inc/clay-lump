/**
 * Ref support
 * @private
 * @function refMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const {parse: parseRef} = require('clay-resource-ref')

/** @lends refMix */
function refMix (BaseClass) {
  /** @class RefMixed */
  class RefMixed extends BaseClass {
    get $$refMixed () {
      return true
    }

    /**
     * Resolve ref string
     * @param {string} ref - Ref string (eg. "User#1")
     * @returns {Promise<Entity>}
     */
    async resolveEntityRef (ref) {
      const {resource: resourceName, id} = parseRef(ref)
      const resource = this.getResource(resourceName)
      return resource.one(id)
    }
  }

  return RefMixed
}

module.exports = refMix
