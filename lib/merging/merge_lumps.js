/**
 * Merge lumps
 * @function mergeLumps
 * @param {ClayLump} target - Lump which will be changed
 * @param {...ClayLump} sources - Source lumps to merge with
 * @returns {Promise}
 */
'use strict'
const co = require('co')
const mergeSheets = require('./merge_sheets')

/** @lends mergeLumps */
function mergeLumps (target, ...sources) {
  return co(function * () {
    while (sources.length > 1) {
      target = yield mergeLumps(target, sources.shift())
    }
    let source = sources.shift()
    let { sheets } = yield source.describe()

    // Merge sheets
    {
      let { shared: sheetNames = [] } = sheets
      for (let sheetName of sheetNames) {
        let targetSheet = target.sheet(sheetName)
        let sourceSheet = source.sheet(sheetName)
        yield mergeSheets(targetSheet, sourceSheet)
      }
    }
  })
}

module.exports = mergeLumps
