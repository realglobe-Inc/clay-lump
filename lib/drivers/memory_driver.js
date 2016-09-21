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
  // Basic interfaces
  // ---------------------
  open () {
    const s = this
    s._open = true
    s._pool = {}
  }

  close () {
    const s = this
    s._open = false
    s._pool = {}
  }

  // ---------------------
  // CRUD interfaces
  // ---------------------
  create (namepath, data) {
    const s = this
    return co(function * () {
      let found = yield s.read(namepath)
      if (found) {
        throw new Error(`[clay:memory-driver] Already used: ${namepath}`)
      }
      let { _pool: pool } = s
      return set(pool, namepath, data)
    })
  }

  read (namepath) {
    const s = this
    return co(function * () {
      let { _pool: pool } = s
      return has(pool, namepath) && get(pool, namepath)
    })
  }

  update (namepath, data) {
    const s = this
    return co(function * () {
      let found = yield s.read(namepath)
      if (!found) {
        throw new Error(`[clay:memory-driver] Not found: ${namepath}`)
      }
      let { _pool: pool } = s
      return set(pool, namepath, data)
    })
  }

  // ---------------------
  // Other interfaces
  // ---------------------
  delete (namepath) {
    const s = this
    return co(function * () {
      let { _pool: pool } = s
      remove(pool, namepath)
    })
  }

}

module.exports = MemoryDriver
