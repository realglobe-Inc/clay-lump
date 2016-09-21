/**
 * Shared sheet
 * @class SharedSheet
 */
'use strict'

const Sheet = require('./sheet')

/** @lends SharedSheet */
class SharedSheet extends Sheet {
  get prefix () {
    return '@@shared'
  }
}

module.exports = SharedSheet
