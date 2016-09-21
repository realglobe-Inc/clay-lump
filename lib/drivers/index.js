/**
 * Driver classes
 * @module drivers
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get Driver () { return d(require('./driver')) },
  get MemoryDriver () { return d(require('./memory_driver')) }
}
