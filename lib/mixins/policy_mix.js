/**
 * Mix policy support
 * @private
 * @function policyMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const { LogPrefixes, ReservedResources } = require('clay-constants')
const { LUMP_PREFIX } = LogPrefixes
const clayPolicy = require('clay-policy')
const { isPolicy } = clayPolicy

/** @lends policyMix */
function policyMix (BaseClass) {
  /** @class PolicyMixed */
  class PolicyMixed extends BaseClass {
    get $$policyMixed () {
      return true
    }

    constructor () {
      super(...arguments)
      this._policies = {}
    }

    /**
     * Register policies
     * @param {Object} policies - Policies to register
     * @throw {Error} Throws error when policy already registered
     */
    registerPolicies (policies) {
      for (const name of Object.keys(policies || {})) {
        this.registerPolicy(name, policies[ name ])
      }
    }

    /**
     * Register a policy
     * @param {string} name - Resource name to apply policy
     * @param {ClayPolicy} policy - Policies to register
     * @throw {Error} Throws error when policy already registered
     */
    registerPolicy (name, policy) {
      if (this._policies[ name ]) {
        throw new Error(`${LUMP_PREFIX} policy already registered!`)
      }
      if (!isPolicy(policy)) {
        policy = clayPolicy(policy)
      }
      this._policies[ name ] = policy
      return this
    }

    /**
     * Get a policy
     * @param {string} name - Name of policy
     * @returns {?ClayPolicy} - Registered policy
     */
    getPolicy (name) {
      return this._policies[ name ]
    }

  }

  return PolicyMixed
}

module.exports = policyMix
