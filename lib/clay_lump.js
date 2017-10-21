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

const argx = require('argx')
const {EventEmitter} = require('events')
const {
  policyMix,
  driveMix,
  resourceMix,
  mergeMix
} = require('./mixins')
const {MemoryDriver} = require('clay-driver-memory')
const {LogPrefixes, LumpSpec} = require('clay-constants')
const {LUMP_PREFIX} = LogPrefixes
const {NAME_PATTERN} = LumpSpec

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

    const args = argx(arguments)
    name = args.shift('string')
    options = args.shift('object') || options
    name = name || options.name

    if (!name) {
      throw new Error(`${LUMP_PREFIX} Lump name is required!`)
    }
    const {
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
  async sync (lump) {
    const s = this
    await s.merge(lump)
    await lump.merge(s)
  }

  /**
   * Asset lump state and throw error if something is wrong
   * @throws {Error}
   */
  assert () {
    const s = this
    let {name} = s
    if (!NAME_PATTERN.test(name)) {
      throw new Error(`${LUMP_PREFIX} invalid name: ${name}`)
    }
  }

  /**
   * Dump database
   * @param {string} dirname - Directory name to dump
   * @param {Object} [options={}] - Optional settings
   * @param {boolean} [options.force=false] - Override if already exists
   * @returns {Promise}
   */
  async dump (dirname, options = {}) {
    const s = this
    const {driver} = s
    let supported = driver && driver.dump
    if (supported) {
      await driver.dump(dirname, options)
    } else {
      throw new Error(`${LUMP_PREFIX} dump is not supported with the driver`)
    }
  }

  /**
   * Restore database
   * @param {string} dirname - Directory name of the dump
   * @param {Object} [options={}] - Optional settings
   * @param {boolean} [options.force=false] - Override existing data
   * @returns {Promise}
   */
  async restore (dirname, options = {}) {
    const s = this
    const {driver} = s
    const supported = driver && driver.restore
    if (supported) {
      await driver.restore(dirname, options)
    } else {
      throw new Error(`${LUMP_PREFIX} restore is not supported with the driver`)
    }
  }

  /**
   * Close database
   * @returns {Promise}
   */
  async close () {
    const s = this
    const {driver} = s
    if (driver && driver.close) {
      await Promise.resolve(driver.close())
    }
  }
}

module.exports = ClayLump
