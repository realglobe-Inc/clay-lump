/**
 * Local storage of Clay DB.
 * @class ClayLump
 * @augments PolicyMixed
 * @augments DriverMixed
 * @augments MergeMixed
 * @augments ResourceMixed
 * @param {string} name - Lump name
 * @param {Object} [options={}] - Optional settings
 * @param {Driver} [options.driver] - Clay driver instance
 */
'use strict'

const co = require('co')
const argx = require('argx')
const { EventEmitter } = require('events')
const {
  policyMix,
  driveMix,
  resourceMix,
  mergeMix
} = require('./mixins')
const { MemoryDriver } = require('clay-driver-memory')
const { LogPrefixes, LumpSpec } = require('clay-constants')
const { LUMP_PREFIX } = LogPrefixes
const { NAME_PATTERN } = LumpSpec

const ClayLumpBase = [
  policyMix,
  driveMix,
  resourceMix,
  mergeMix
].reduce((ClayLump, mix) => mix(ClayLump), EventEmitter)

/** @lends ClayLump */
class ClayLump extends ClayLumpBase {
  get $$lump () {
    return true
  }

  constructor (name, options = {}) {
    super()
    const s = this

    let args = argx(arguments)
    name = args.shift('string')
    options = args.shift('object') || options
    name = name || options.name

    if (!name) {
      throw new Error(`${LUMP_PREFIX} Lump name is required!`)
    }
    let {
      driver = new MemoryDriver(),
      policies = {}
    } = options

    s.name = name
    s.registerDriver(driver)
    s.registerPolicies(policies)
  }

  /**
   * Two-way merge
   * @param {ClayLump} lump - Lump to sync
   * @returns {Promise}
   */
  sync (lump) {
    const s = this
    return co(function * () {
      yield s.merge(lump)
      yield lump.merge(s)
    })
  }

  /**
   * Asset lump state and throw error if something is wrong
   * @throws {Error}
   */
  assert () {
    const s = this
    let { name } = s
    if (!NAME_PATTERN.test(name)) {
      throw new Error(`${LUMP_PREFIX} invalid name: ${name}`)
    }
  }
}

module.exports = ClayLump
