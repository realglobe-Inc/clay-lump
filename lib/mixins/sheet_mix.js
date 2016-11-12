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
     * Access to lump shared sheet
     * @param {string} sheetName - Name of sheet
     * @param {Object} [options={}] - Optional settings
     * @param {string} [options.kind='shared'] - Sheet kind
     * @returns {Sheet}
     */
    sheet (sheetName, options = {}) {
      const s = this
      let { kind = 'shared' } = options
      s.assertOpen()
      let pointer = `/${kind}/${sheetName}`
      let {
        _driver: driver,
        _sheets: sheets,
        _signer: signer
      } = s
      if (!sheets) {
        sheets = s._sheets = {}
      }
      if (!has(sheets, pointer)) {
        let sheet = createSheet(kind, sheetName, {
          driver,
          signer
        })
        set(sheets, pointer, sheet)
      }
      return get(sheets, pointer)
    }

    /**
     * Access to config sheet
     * @param {string} sheetName - Name of sheet
     * @returns {PrivateSheet}
     */
    privateSheet (sheetName) {
      const s = this
      return s.sheet(sheetName, { kind: 'private' })
    }

    /**
     * Access to config sheet
     * @returns {PrivateSheet}
     */
    configSheet () {
      const { CONFIG_SHEET } = SheetNames
      const s = this
      return s.privateSheet(CONFIG_SHEET)
    }
  }
}

module.exports = sheetMix
