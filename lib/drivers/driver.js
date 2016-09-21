/**
 * Abstract driver
 * @abstract
 * @class Driver
 */
'use strict'

const co = require('co')

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
      'open', 'close', 'create', 'read', 'update', 'delete', 'cursor'
    ]
  }

  static get supportedOperator () {
    return {
      $eq: '=',
      $ne: '!=',
      $gte: '>=',
      $gt: '>',
      $lte: '<=',
      $lt: '<',
      $not: 'IS NOT',
      $is: 'IS',
      $like: 'LIKE',
      $notLike: 'NOT LIKE',
      $iLike: 'ILIKE',
      $notILike: 'NOT ILIKE',
      $between: 'BETWEEN',
      $notBetween: 'NOT BETWEEN',
      $overlap: '&&',
      $contains: '@>',
      $contained: '<@',
      $adjacent: '-|-',
      $strictLeft: '<<',
      $strictRight: '>>',
      $noExtendRight: '&<',
      $noExtendLeft: '&>'
    }
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

  /**
   * Get cursor to iterate
   * @param {string} namepath - Namepath string
   * @param {Object} options - Optional settings
   * @returns {Promise.<Driver.Cursor>}
   */
  cursor (namepath, options = {}) {
    throw notImplementedError()
  }

  /**
   * Count entries
   * @param {string} namepath - Namepath string
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise.<number>}
   */
  count (namepath, options = {}) {
    const s = this
    // Should be overriden with more clever way
    return co(function * () {
      let count = 0
      let cursor = s.cursor(namepath, options)
      while (cursor.hasNext()) {
        yield cursor.next()
        count += 1
      }
      return count
    })
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
