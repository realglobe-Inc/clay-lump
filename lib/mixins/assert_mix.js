/**
 * Define mixin for assert.
 * @function assertMix
 * @param {function} baseClass - Base class to mix
 * @returns {function} - Defined class
 */
'use strict'

const { LogPrefixes } = require('clay-constants')

/** @lends assertMix */
function assertMix (baseClass) {
  return class AssertMixed extends baseClass {
    get $$assertMixed () {
      return true
    }

    /**
     * Ensure open
     */
    assertOpen () {
      const s = this
      const { LUMP_PREFIX } = LogPrefixes
      if (!s._open) {
        throw new Error(`[${LUMP_PREFIX}] Not open!`)
      }
    }

    /**
     * Ensure not open
     */
    assertNotOpen () {
      const s = this
      const { LUMP_PREFIX } = LogPrefixes
      if (s._open) {
        throw new Error(`[${LUMP_PREFIX}] Already open!`)
      }
    }
  }
}

module.exports = assertMix

