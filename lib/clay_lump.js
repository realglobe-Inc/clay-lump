/**
 * @class ClayLump
 */
'use strict'

const { generate: generateKeyPair, sign } = require('clay-crypto')
const { MemoryDriver } = require('clay-driver-memory')
const { mixAll } = require('./helpers')
const { mergeLumps } = require('./merging')
const co = require('co')
const { assertMix, sheetMix } = require('./mixins')
const { RecordCols, ConfigKeys } = require('clay-constants')
const {
  RECORD_KEY,
  RECORD_VALUE,
  RECORD_AT,
  RECORD_SEAL,
  RECORD_BY
} = RecordCols

const {
  LUMP_ID,
  LUMP_PRIVATE_KEY,
  LUMP_PUBLIC_KEY
} = ConfigKeys

class Abstract {}

/** @lends ClayLump */
class ClayLump extends mixAll(Abstract, [ assertMix, sheetMix ]) {
  constructor (options = {}) {
    super()
    let { driver = new MemoryDriver() } = options
    const s = this
    s._driver = driver
    s._signer = (record, { sheet }) => s.signRecord(record, { sheet })
    s._sheets = {}
    s._open = false
    s._keypair = null
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

  /**
   * Open lump
   * @returns {Promise}
   */
  open () {
    const s = this
    let { _driver: driver } = s
    s.assertNotOpen()
    return co(function * () {
      s._open = true
      yield Promise.resolve(driver.connect())
    })
  }

  /**
   * Close lump
   * @returns {Promise}
   */
  close () {
    const s = this
    s.assertOpen()
    let { _driver: driver } = s
    return co(function * () {
      s._open = false
      yield Promise.resolve(driver.disconnect())
    })
  }

  /**
   * Key pair of this lump.
   * Generate new one If not exists
   * @returns {Promise.<Object>}
   */
  keyPair () {
    const s = this
    let configSheet = s.configSheet()
    s.assertOpen()
    return co(function * () {
      let { _keypair: cached } = s
      if (cached) {
        return cached
      }
      let restored = yield configSheet.getAll([
        LUMP_ID,
        LUMP_PRIVATE_KEY,
        LUMP_PUBLIC_KEY
      ])
      if (restored) {
        let id = restored[ LUMP_ID ]
        let privateKey = restored[ LUMP_PRIVATE_KEY ]
        let publicKey = restored[ LUMP_PUBLIC_KEY ]
        s._keypair = { id, privateKey, publicKey }
        return s._keypair
      }

      let { id, privateKey, publicKey } = generateKeyPair()
      yield configSheet.setAll({
        [LUMP_ID]: id,
        [LUMP_PRIVATE_KEY]: privateKey,
        [LUMP_PUBLIC_KEY]: publicKey
      })
      return s.keyPair()
    })
  }

  signRecord (record, { sheet }) {
    const s = this
    let configSheet = s.configSheet()
    return co(function * () {
      if (!s._open) {
        return record
      }
      let key = record[ RECORD_KEY ]
      let value = record[ RECORD_VALUE ]
      let at = record[ RECORD_AT ]
      if (configSheet.is(sheet)) {
        let skip = !!~[
          LUMP_ID,
          LUMP_PRIVATE_KEY,
          LUMP_PUBLIC_KEY
        ].indexOf(key)
        if (skip) {
          return record
        }
      }
      let { privateKey, publicKey } = yield s.keyPair()
      return Object.assign(record, {
        [RECORD_BY]: publicKey,
        [RECORD_SEAL]: sign({ key, value, at }, privateKey)
      })
    })
  }

}

module.exports = ClayLump
