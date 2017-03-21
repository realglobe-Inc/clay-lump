/**
 * Mixin functions
 * @module mixins
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get driveMix () { return d(require('./drive_mix')) },
  get mergeMix () { return d(require('./merge_mix')) },
  get policyMix () { return d(require('./policy_mix')) },
  get resourceMix () { return d(require('./resource_mix')) }
}
