/**
 * @class ClayLump
 */
'use strict'

const { generate: generateKeyPair } = require('clay-crypto')
const { MemoryDriver } = require('clay-driver-memory')
const { mergeLumps } = require('./merging')
const co = require('co')
const { assertMix, sheetMix } = require('./mixins')

const mixAll = (baseClass, mixins) => mixins.reduce(
  (mixed, mix) => mix(mixed), baseClass
)

class Abstract {}

/** @lends ClayLump */
class ClayLump extends mixAll(Abstract, [ assertMix, sheetMix ]) {
  constructor (options = {}) {
    super()
    let { driver = new MemoryDriver() } = options
    const s = this
    s._driver = driver
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
      yield Promise.resolve(driver.open())
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
      yield Promise.resolve(driver.close())
    })
  }

  /**
   * Key pair of this lump.
   * Generate new one If not exists
   * @returns {Promise.<Object>}
   */
  keyPair () {
    const LUMP_KEYPAIR_KEY = 'lump:keypair'
    const s = this
    let configSheet = s.configSheet()
    s.assertOpen()
    return co(function * () {
      let { _keypair: cached } = s
      if (cached) {
        return cached
      }
      let restored = yield configSheet.get(LUMP_KEYPAIR_KEY)
      if (restored) {
        s._keypair = restored
        return restored
      }

      let newly = generateKeyPair()
      yield configSheet.set(LUMP_KEYPAIR_KEY, newly)
      s._keypair = newly
      return newly
    })
  }

}

module.exports = ClayLump
