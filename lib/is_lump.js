/**
 * Check if an instance is a lump
 * @function isLump
 * @param {*} instance - Instance to check
 * @returns {Boolean} - Lump or not
 */
'use strict'

const ClayLump = require('./clay_lump')

/** @lends isLump */
function isLump (instance) {
  return (instance instanceof ClayLump) || instance.$$lump
}

module.exports = isLump
