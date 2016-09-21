/**
 * Private sheet
 * @class PrivateSheet
 */
'use strict'

const Sheet = require('./sheet')

/** @lends PrivateSheet */
class PrivateSheet extends Sheet {
  get prefix () {
    return '@private'
  }
}

module.exports = PrivateSheet
