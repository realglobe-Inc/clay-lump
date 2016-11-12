/**
 * Merge lump sheets
 * @function mergeSheets
 * @param {ClayLump} target - Lump sheet which will be changed
 * @param {...ClayLump} sources - Source lump sheets to merge with
 * @returns {Promise}
 */
'use strict'

const co = require('co')

/** @lends mergeSheets */
function mergeSheets (target, ...sources) {
  return co(function * () {
    while (sources.length > 1) {
      target = yield mergeSheets(target, sources.shift())
    }
    let source = sources.shift()

    // Validate merging
    {
      let ok = target.name === source.name
      if (!ok) {
        throw new Error(`[clay-lump] Sheet names must be match: ["${target.name}", "${source.name}"]`)
      }
    }

    // Merge known records
    {
      let cursor = yield target.recordCursor()
      while (yield cursor.hasNext()) {
        let targetRecord = yield cursor.next()
        let { key } = targetRecord
        let sourceRecord = yield source.recordGet(key)
        if (!sourceRecord) {
          continue
        }
        let isNew = !!sourceRecord && (targetRecord.at <= sourceRecord.at)
        if (isNew) {
          yield target.recordSet(key, sourceRecord)
        }
      }
    }
  })
}

module.exports = mergeSheets
