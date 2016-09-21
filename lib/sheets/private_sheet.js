/**
 * Private sheet
 * @class PrivateSheet
 */
'use strict'

const { SheetPrefixes: prefixes } = require('clay-constants')
const Sheet = require('./sheet')

/** @lends PrivateSheet */
class PrivateSheet extends Sheet {
  get prefix () {
    return prefixes.PRIVATE_SHEET
  }
}

module.exports = PrivateSheet
