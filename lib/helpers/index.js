/**
 * Helper functions
 * @module helpers
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get mixAll () { return d(require('./mix_all')) }
}
