/**
 * Sheet classes
 * @module sheets
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get create () { return d(require('./create')) },
  get LocalSheet () { return d(require('./local_sheet')) },
  get SharedSheet () { return d(require('./shared_sheet')) },
  get Sheet () { return d(require('./sheet')) }
}
