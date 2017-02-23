/**
 * Local key value storage of Clay DB.
 * @class ClayLump
 * @param {Object} config - Lump configuration
 * @param {ClayDriver} config.driver - Driver instance
 */
'use strict'

const { EventEmitter } = require('events')
const { generate: generateKeyPair, sign } = require('clay-crypto')
const { MemoryDriver } = require('clay-driver-memory')

/** @lends ClayLump */
class ClayLump extends EventEmitter {
  get $$lump () {
    return true
  }
}

module.exports = ClayLump
