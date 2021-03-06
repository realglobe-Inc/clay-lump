/**
 * Mix driver support
 * @private
 * @function driverMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const { LogPrefixes } = require('clay-constants')
const { LUMP_PREFIX } = LogPrefixes

/** @lends driveMix */
function driveMix (BaseClass) {
  /** @class */
  class DriverMixed extends BaseClass {
    get $$driveMixed () {
      return true
    }

    constructor () {
      super(...arguments)
      const s = this
      s._driver = null
    }

    /**
     * Register a driver
     * @param {Driver} driver - Driver to register
     * @throw {Error} Throws error when driver already registered
     */
    registerDriver (driver) {
      if (this._driver) {
        throw new Error(`${LUMP_PREFIX} driver already registered!`)
      }
      this._driver = driver
    }

    /**
     * Registered Driver
     * @property {Driver}
     */
    get driver () {
      if (!this._driver) {
        throw new Error(`${LUMP_PREFIX} driver not registered!`)
      }
      return this._driver
    }
  }

  return DriverMixed
}

module.exports = driveMix
