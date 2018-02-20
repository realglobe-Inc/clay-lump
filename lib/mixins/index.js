/**
 * Mixin functions
 * @module mixins
 */

'use strict'

const d = (module) => module && module.default || module

const driveMix = d(require('./drive_mix'))
const mergeMix = d(require('./merge_mix'))
const policyMix = d(require('./policy_mix'))
const refMix = d(require('./ref_mix'))
const resourceMix = d(require('./resource_mix'))

module.exports = {
  driveMix,
  mergeMix,
  policyMix,
  refMix,
  resourceMix
}
