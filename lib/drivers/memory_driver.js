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
      return has(pool, namepath) ? get(pool, namepath) : undefined
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
  iterator (namepath, options = {}) {
    const s = this
    let { where = {} } = options
    return co(function * () {
      let found = yield s.read(namepath)
      let keys = Object.keys(found || {}).filter((key) => {
        let condition = where[ key ]
        if (!condition) {
          return true
        }
        let value = found[ key ]
        let operator = Object.keys(condition)
          .filter((key) => Driver.supportedOperator[ key ])
          .shift()
        if (operator) {
          switch (operator) {
            case '$gte':
              return value >= condition
            case '$gt':
              return value >= condition
            case '$lte':
              return value <= condition
            case '$lt':
              return value <= condition
            case '$not':
              return value !== condition
            case '$is':
              return value === condition
            default: {
              throw new Error(`[clay-lump] Operator not supported: "${operator}"`)
            }
          }
        }
        return value === condition
      })
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
