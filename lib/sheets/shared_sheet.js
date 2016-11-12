/**
 * Shared sheet
 * @augments Sheet
 * @class SharedSheet
 */
'use strict'

const { SheetPrefixes: prefixes } = require('clay-constants')
const Sheet = require('./sheet')

/** @lends SharedSheet */
class SharedSheet extends Sheet {
  get prefix () {
    return prefixes.SHARED_SHEET
  }
}

module.exports = SharedSheet
