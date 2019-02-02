/**
 * Mixin functions
 * @module mixins
 */

'use strict'


const driveMix = require('./drive_mix')
const mergeMix = require('./merge_mix')
const policyMix = require('./policy_mix')
const refMix = require('./ref_mix')
const resourceMix = require('./resource_mix')

exports.driveMix = driveMix
exports.mergeMix = mergeMix
exports.policyMix = policyMix
exports.refMix = refMix
exports.resourceMix = resourceMix

module.exports = {
  driveMix,
  mergeMix,
  policyMix,
  refMix,
  resourceMix
}
