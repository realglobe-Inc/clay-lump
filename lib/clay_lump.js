/**
 * Local key value storage of Clay DB.
 * @class ClayLump
 * @param {Object} config - Lump configuration
 * @param {Driver} config.driver - Clay driver instance
 */
'use strict'

const co = require('co')
const { EventEmitter } = require('events')
const { driveMix, resourceMix, mergeMix } = require('./mixins')
const { generate: generateKeyPair, sign } = require('clay-crypto')
const { MemoryDriver } = require('clay-driver-memory')

const ClayLumpBase = [
  driveMix,
  resourceMix,
  mergeMix
].reduce((ClayLump, mix) => mix(ClayLump), EventEmitter)

/** @lends ClayLump */
class ClayLump extends ClayLumpBase {
  get $$lump () {
    return true
  }

  constructor (config = {}) {
    super()
    const s = this

    let {
      driver = new MemoryDriver()
    } = config

    s.registerDriver(driver)
  }

  /**
   * Two-way merge
   * @returns {Promise}
   */
  sync (lump) {
    const s = this
    return co(function * () {
      yield s.merge(lump)
      yield lump.merge(s)
    })
  }
}

module.exports = ClayLump
