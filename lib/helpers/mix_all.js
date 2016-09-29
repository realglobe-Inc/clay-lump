/**
 * Mix multiple mixins
 * @function mixAll
 * @param {function} baseClass
 * @param {function[]} mixins
 * @returns {function} - Mixed class
 */
'use strict'

/** @lends mixAll */
function mixAll (baseClass, mixins) {
  return mixins.reduce(
    (mixed, mix) => mix(mixed), baseClass
  )
}

module.exports = mixAll
