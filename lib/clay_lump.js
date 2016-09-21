/**
 * @class ClayLump
 */
'use strict'

const { Sheet } = require('./sheets')
const { MemoryDriver } = require('./drivers')
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
   * Access to lump sheet
   * @param {string} sheetName - Name of sheet
   * @returns {Sheet}
   */
  sheet (sheetName) {
    const s = this
    s.assertOpen()
    let { _driver: driver } = s
    let sheet = s._sheets[ sheetName ]
    if (!sheet) {
      sheet = s._sheets[ sheetName ] = new Sheet(sheetName, { driver })
    }
    return sheet
  }

  sync (lump) {

  }

  describe () {

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
