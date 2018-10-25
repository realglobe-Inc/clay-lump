/**
 * Mixin functions
 * @module mixins
 */

'use strict'

const _d = (module) => module && module.default || module

const driveMix = _d(require('./drive_mix'))
const mergeMix = _d(require('./merge_mix'))
const policyMix = _d(require('./policy_mix'))
const refMix = _d(require('./ref_mix'))
const resourceMix = _d(require('./resource_mix'))

module.exports = {
  driveMix,
  mergeMix,
  policyMix,
  refMix,
  resourceMix
}
