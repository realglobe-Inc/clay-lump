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

  /**
   * Open driver
   * @param {Object} config
   * @returns {Promise}
   */
  open (config) {
    throw notImplementedError()
  }

  /**
   * Close driver
   * @param {Object} config
   * @returns {Promise}
   */
  close (config) {
    throw notImplementedError()
  }

  // ---------------------
  // CRUD Interfaces
  // ---------------------

  /**
   * Create data with namepath
   * @param {string} namepath - Namepath string
   * @param {Object} data - Resource data to create
   * @returns {Promise}
   */
  create (namepath, data) {
    throw notImplementedError()
  }

  /**
   * Read data with namepath
   * @param {string} namepath - Namepath string
   * @returns {Promise}
   */
  read (namepath) {
    throw notImplementedError()
  }

  /**
   * Update data with namepath
   * @param {string} namepath - Namepath string
   * @param {Object} data - Resource data to create
   * @returns {Promise}
   */
  update (namepath, data) {
    throw notImplementedError()
  }

  /**
   * Delete data with namepath
   * @param {string} namepath - Namepath string
   * @returns {Promise}
   */
  delete (namepath) {
    throw notImplementedError()
  }

  // ---------------------
  // Other Interfaces
  // ---------------------
  count (namepath) {
    throw notImplementedError()
  }

  iterator (namepath) {
    throw notImplementedError()
  }
}

/**
 * Cursor of driver data
 * @class Driver.Cursor
 */
class Cursor {
  constructor (properties = {}) {
    const s = this
    Object.assign(s, properties)
  }

  /**
   * Check has next data
   * @returns {Promise.<Boolean>}
   */
  hasNext () {
    throw notImplementedError()
  }

  /**
   * Next data
   * @returns {Promise.<*>}
   */
  next () {
    throw notImplementedError()
  }
}

module.exports = Object.assign(Driver, { Cursor })
