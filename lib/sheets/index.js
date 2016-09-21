/**
 * Sheets classes
 * @module sheets
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get Sheet () { return d(require('./sheet')) }
}
