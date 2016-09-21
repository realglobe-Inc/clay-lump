/**
 * @class ClayLump
 */
'use strict'

const { create: createSheet } = require('./sheets')
const { MemoryDriver } = require('clay-driver-memory')
const { has, get, set } = require('json-pointer')
const { mergeLumps } = require('./merging')
const co = require('co')

/** @lends ClayLump */
class ClayLump {
  constructor (options = {}) {
    let { driver = new MemoryDriver() } = options
    const s = this
    s._driver = driver
    s._sheets = {}
    s._open = false
  }

  /**
   * Access to lump shared sheet
   * @param {string} sheetName - Name of sheet
   * @param {Object} [options={}] - Optional settings
   * @param {string} [options.kind='shared'] - Sheet kind
   * @returns {SharedSheet}
   */
  sheet (sheetName, options = {}) {
    const s = this
    let { kind = 'shared' } = options
    s.assertOpen()
    let pointer = `/${kind}/${sheetName}`
    let { _driver: driver, _sheets: sheets } = s
    if (!has(sheets, pointer)) {
      let sheet = createSheet(kind, sheetName, { driver })
      set(sheets, pointer, sheet)
    }
    return get(sheets, pointer)
  }

  /**
   * Sync with another lump
   * @param {Object} lump
   * @returns {Promise}
   */
  sync (lump) {
    const s = this
    s.assertOpen()
    return co(function * () {
      yield mergeLumps(s, lump)
      yield mergeLumps(lump, s)
    })
  }

  /**
   * Describe thi lump
   * @returns {Promise}
   */
  describe () {
    const s = this
    s.assertOpen()
    let { _sheets: sheets } = s
    return co(function * () {
      return {
        sheets: Object.keys(sheets)
          .reduce((description, kind) => Object.assign(description, {
            [kind]: Object.keys(sheets[ kind ])
          }), {})
      }
    })
  }

  open () {
    const s = this
    let { _driver: driver } = s
    if (s._open) {
      throw new Error('[ClayLump] Already open!')
    }
    return co(function * () {
      s._open = true
      yield Promise.resolve(driver.open())
    })
  }

  close () {
    const s = this
    let { _driver: driver } = s
    if (!s._open) {
      throw new Error('[ClayLump] Not open!')
    }
    return co(function * () {
      s._open = false
      yield Promise.resolve(driver.close())
    })
  }

  assertOpen () {
    const s = this
    if (!s._open) {
      throw new Error('[ClayLump] Not open!')
    }
  }
}

module.exports = ClayLump
