/**
 * Basic sheet class
 * @class Sheet
 */
'use strict'

const co = require('co')
const { RecordCols } = require('clay-constants')
const {
  RECORD_KEY,
  RECORD_VALUE,
  RECORD_AT
} = RecordCols

const defaultSigner = (record, options = {}) => record

/** @lends Sheet */
class Sheet {
  constructor (name, config) {
    let {
      signer = defaultSigner,
      driver
    } = config
    const s = this
    Object.assign(s, {
      name,
      driver,
      signer
    })
  }

  /**
   * Get value from sheet
   * @param {string} key
   * @returns {Promise}
   */
  get (key) {
    const s = this
    return co(function * () {
      let record = yield s.recordGet(key)
      return record ? record.value : undefined
    })
  }

  /**
   * Get values with multiple keys
   * @param {string[]} keys - Keys to get
   * @returns {Promise.<Object>} - Composed values
   */
  getAll (keys) {
    const s = this
    return co(function * () {
      let values = undefined
      for (let key of keys) {
        let value = yield s.get(key)
        if (typeof value === 'undefined') {
          continue
        }
        values = values || {}
        values[ key ] = value
      }
      return values
    })
  }

  /**
   * Has value with key
   * @param {string} key
   * @returns {Promise.<Boolean>}
   */
  has (key) {
    const s = this
    return co(function * () {
      let value = yield s.get(key)
      return typeof value !== 'undefined'
    })
  }

  /**
   * Set value to sheet
   * @param {string} key - Key to set
   * @param {*} value - Value to set
   * @returns {Promise}
   */
  set (key, value) {
    const s = this
    let { signer } = s
    return co(function * () {
      let record = yield Promise.resolve(
        signer({
          [RECORD_KEY]: key,
          [RECORD_VALUE]: value,
          [RECORD_AT]: new Date()
        }, { sheet: s })
      )
      yield s.recordSet(key, record)
      return s.get(key)
    })
  }

  /**
   * Set multiple values
   * @param {Object} keyValues
   * @returns {Promise.<Object>}
   */
  setAll (keyValues) {
    const s = this
    return co(function * () {
      let results = {}
      let keys = Object.keys(keyValues || {})
      for (let key of keys) {
        let value = keyValues[ key ]
        results[ key ] = yield s.set(key, value)
      }
      return results
    })
  }

  /**
   * Delete from sheet
   * @param key
   * @returns {Promise}
   */
  del (key) {
    const s = this
    return co(function * () {
      yield s.set(key, undefined)
    })
  }

  /**
   * Get keys
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise.<Array.<String>>}
   */
  keys (options = {}) {
    const s = this
    return co(function * () {
      let keys = []
      let cursor = yield s.recordCursor(options)
      while (yield cursor.hasNext()) {
        let { key } = yield cursor.next()
        keys.push(key)
      }
      return keys
    })
  }

  /**
   * All values
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise.<Array.<String>>}
   */
  all (options = {}) {
    const s = this
    return co(function * () {
      let values = []
      let cursor = yield s.recordCursor(options)
      while (yield cursor.hasNext()) {
        let { value } = yield cursor.next()
        values.push(value)
      }
      return values
    })
  }

  /**
   * Get value iterator
   * @param {Object} [options={}] - Optional settings
   * @returns {{hasNext:function, next: function}} - An iterator
   */
  iterator (options = {}) {
    const s = this
    return co(function * () {
      let cursor = yield s.recordCursor(options)
      return {
        hasNext: () => cursor.hasNext(),
        next: () => cursor.next().then(({ value }) => value)
      }
    })
  }

  is (sheet) {
    const s = this
    return !!sheet && (sheet.recordNamePath(null) === s.recordNamePath(null))
  }

  // --------------------
  // record Access
  // --------------------

  recordNamePath (key) {
    const s = this
    let { prefix = null, name } = s
    return '/' + [ prefix, name, key ].filter(Boolean).join('/')
  }

  recordCursor (options = {}) {
    const s = this
    let { driver } = s
    return co(function * () {
      let namepath = s.recordNamePath(null)
      return driver.cursor(namepath, {})
    })
  }

  recordGet (key) {
    const s = this
    let { driver } = s
    return co(function * () {
      let namepath = s.recordNamePath(key)
      let record = yield Promise.resolve(
        driver.read(namepath)
      )
      if (!record) {
        return undefined
      }
      return record
    })
  }

  recordSet (key, record) {
    const s = this
    let { driver } = s
    return co(function * () {
      let namepath = s.recordNamePath(key)
      let current = yield s.recordGet(key)
      if (current) {
        yield Promise.resolve(
          driver.update(namepath, record)
        )
      } else {
        yield Promise.resolve(
          driver.create(namepath, record)
        )
      }
    })
  }

}

module.exports = Sheet
