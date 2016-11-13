/**
 * Define mixin for sheet.
 * @function sheetMix
 * @param {function} baseClass - Base class to mix
 * @returns {function} - Defined class
 */
'use strict'

const { create: createSheet } = require('../sheets')
const { has, get, set } = require('json-pointer')
const { SheetNames } = require('clay-constants')

/** @lends sheetMix */
function sheetMix (baseClass) {
  return class SheetMixed extends baseClass {
    get $$sheetMixed () {
      return true
    }

    /**
     * Check sheet exists
     * @param {string} sheetName - Name of sheet
     * @param {Object} options - Optional settings
     */
    hasSheet (sheetName, options = {}) {
      const s = this
      let pointer = s.sheetPointer(sheetName, options)
      let { _sheets: sheets } = s
      return has(sheets, pointer)
    }

    /**
     * Create a new sheet
     * @param {string} sheetName - Name of sheet
     * @param {Object} options - Optional settings
     * @returns {Sheet} - Created sheet
     */
    createSheet (sheetName, options = {}) {
      const s = this
      let { kind } = options
      let {
        _sheets: sheets,
        _driver: driver,
        _signer: signer
      } = s
      let sheet = createSheet(kind, sheetName, {
        driver,
        signer
      })
      let pointer = s.sheetPointer(sheetName, options)
      set(sheets, pointer, sheet)
      return sheet
    }

    /**
     * Get a sheet
     * @param {string} sheetName - Name of sheet
     * @param {Object} options - Optional settings
     * @returns {Sheet}
     */
    getSheet (sheetName, options = {}) {
      const s = this
      let pointer = s.sheetPointer(sheetName, options)
      let { _sheets: sheets } = s
      return get(sheets, pointer)
    }

    /**
     * Pointer for sheet
     * @param {string} sheetName - Name of sheet
     * @param {Object} options - Optional settings
     * @returns {string} - JSON pointer for sheet
     */
    sheetPointer (sheetName, options = {}) {
      let { kind = 'shared' } = options
      return `/${kind}/${sheetName}`
    }

    /**
     * Access to lump sheet
     * @param {string} sheetName - Name of sheet
     * @param {Object} [options={}] - Optional settings
     * @param {string} [options.kind='shared'] - Sheet kind
     * @returns {Sheet}
     */
    sheet (sheetName, options = {}) {
      const s = this
      let { kind = 'shared' } = options
      s.assertOpen()
      if (!s.hasSheet(sheetName, { kind })) {
        s.createSheet(sheetName, { kind })
      }
      return s.getSheet(sheetName, { kind })
    }

    /**
     * Access to config sheet
     * @param {string} sheetName - Name of sheet
     * @returns {Sheet}
     */
    privateSheet (sheetName) {
      const s = this
      return s.sheet(sheetName, { kind: 'private' })
    }

    /**
     * Access to config sheet
     * @returns {Sheet}
     */
    privateConfigSheet () {
      const { CONFIG_SHEET } = SheetNames
      const s = this
      return s.privateSheet(CONFIG_SHEET)
    }
  }
}

module.exports = sheetMix
