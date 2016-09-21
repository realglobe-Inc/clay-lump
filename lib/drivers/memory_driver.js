/**
 * Abstract driver
 * @augments Driver
 * @class MemoryDriver
 */
'use strict'

const Driver = require('./driver')
const co = require('co')
const { has, get, set, remove } = require('json-pointer')

/** @lends MemoryDriver */
class MemoryDriver extends Driver {
  // ---------------------
  // Basic Interfaces
  // ---------------------
  /** @inheritDoc */
  open (config) {
    const s = this
    s._open = true
    s._pool = {}
  }

  /** @inheritDoc */
  close (config) {
    const s = this
    s._open = false
    s._pool = {}
  }

  // ---------------------
  // CRUD Interfaces
  // ---------------------

  /** @inheritDoc */
  create (namepath, data) {
    const s = this
    return co(function * () {
      let found = yield s.read(namepath)
      if (found) {
        throw new Error(`[clay:memory-driver] Already used: ${namepath}`)
      }
      let { _pool: pool } = s
      set(pool, namepath, data)
      return s.read(namepath)
    })
  }

  /** @inheritDoc */
  read (namepath) {
    const s = this
    return co(function * () {
      let { _pool: pool } = s
      return has(pool, namepath) && get(pool, namepath)
    })
  }

  /** @inheritDoc */
  update (namepath, data) {
    const s = this
    return co(function * () {
      let found = yield s.read(namepath)
      if (!found) {
        throw new Error(`[clay:memory-driver] Not found: ${namepath}`)
      }
      let { _pool: pool } = s
      set(pool, namepath, data)
      return s.read(namepath)
    })
  }

  /** @inheritDoc */
  delete (namepath) {
    const s = this
    return co(function * () {
      let { _pool: pool } = s
      remove(pool, namepath)
    })
  }

  // ---------------------
  // Other Interfaces
  // ---------------------

  /** @inheritDoc */
  count (namepath) {
    const s = this
    return co(function * () {
      let found = yield s.read()
      return Object.keys(found || {})
    })
  }

  /** @inheritDoc */
  iterator (namepath) {
    const s = this
    return co(function * () {
      let found = yield s.read()
      let keys = Object.keys(found || {})
      return new Driver.Cursor({
        hasNext () {
          return Promise.resolve(
            keys.length > 0
          )
        },
        next () {
          return Promise.resolve(
            found[ keys.shift() ]
          )
        }
      })
    })

  }
}

module.exports = MemoryDriver
