/**
 * Class mixin generator
 * @module mixins
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get assertMix () { return d(require('./assert_mix')) },
  get sheetMix () { return d(require('./sheet_mix')) }
}
