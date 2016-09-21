/**
 * Abstract driver
 * @abstract
 * @class Driver
 */
'use strict'

let notImplementedError = () => new Error('Not implemented!')

/** @lends Driver */
class Driver {
  // ---------------------
  // Class Methods
  // ---------------------
  /**
   * Assert driver instance
   * @param {Driver} driver
   */
  static assertDriver (driver) {
    const { requiredMethods } = this
    for (let methodName of requiredMethods) {
      let missing = !driver[ methodName ]
      if (missing) {
        throw new Error(`[clay:driver] Required method is missing: ${methodName}`)
      }
    }
  }

  static get requiredMethods () {
    return [
      'open', 'close', 'create', 'read', 'update', 'delete', 'count'
    ]
  }

  // ---------------------
  // Specs
  // ---------------------
  constructor () {
    const s = this
    Driver.assertDriver(s)
  }

  // ---------------------
  // Basic Interfaces
  // ---------------------
  open (config) {
    throw notImplementedError()
  }

  close (config) {
    throw notImplementedError()
  }

  // ---------------------
  // CRUD Interfaces
  // ---------------------
  create (namepath, data) {
    throw notImplementedError()
  }

  read (namepath) {
    throw notImplementedError()
  }

  update (namepath, data) {
    throw notImplementedError()
  }

  delete (namepath) {
    throw notImplementedError()
  }

  // ---------------------
  // Other Interfaces
  // ---------------------
  count (namepath) {
    throw notImplementedError()
  }
}

module.exports = Driver
