/**
 * Basic sheet class
 * @class Sheet
 */
'use strict'

const co = require('co')

/** @lends Sheet */
class Sheet {
  constructor (name, config) {
    let { driver } = config
    const s = this
    Object.assign(s, {
      name,
      driver
    })
  }

  /**
   * Get value from sheet
   * @param {string} key
   * @returns {Promise}
   */
  get (key) {
    const s = this
    let { driver } = s
    return co(function * () {
      let namepath = s.namepathOf(key)
      let record = yield Promise.resolve(
        driver.read(namepath)
      )
      if (!record) {
        return undefined
      }
      return record.value
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
    let { driver } = s
    return co(function * () {
      let namepath = s.namepathOf(key)
      let record = { key, value, date: new Date() }
      let has = yield s.has(key)
      if (has) {
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
    let { driver } = s
    return co(function * () {
      let namepath = s.namepathOf(null)
      let keys = []
      let cursor = yield driver.iterator(namepath, options)
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
    let { driver } = s
    return co(function * () {
      let namepath = s.namepathOf(null)
      let values = []
      let cursor = yield driver.iterator(namepath, options)
      while (yield cursor.hasNext()) {
        let { value } = yield cursor.next()
        values.push(value)
      }
      return values
    })
  }

  namepathOf (key) {
    const s = this
    let { prefix = null, name } = s
    return '/' + [ prefix, name, key ].filter(Boolean).join('/')
  }

}

module.exports = Sheet
