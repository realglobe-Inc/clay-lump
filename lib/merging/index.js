/**
 * Merging utilities
 * @module merging
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get mergeLumps () { return d(require('./merge_lumps')) },
  get mergeSheets () { return d(require('./merge_sheets')) }
}
