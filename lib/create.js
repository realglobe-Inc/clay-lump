/**
 * Create a lump instance. Just an alias of `new ClayLump(config)`
 * @function clayLump
 * @returns {ClayLump}  - A ClayLump instance
 * @example
 async function tryClayLump () {
   let lump = clayLump({
     // Options here
   })
   const Product = lump.resource('Product')
   // ... //
 }
 tryClayLump()
 */
'use strict'

const ClayLump = require('./clay_lump')

/** @lends clayLump */
function create (...args) {
  return new ClayLump(...args)
}

module.exports = create
