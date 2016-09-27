/**
 * Create a lump instance. Just an alias of `new ClayLump(config)`
 * @function clayLump
 * @returns {ClayLump}  - A ClayLump instance
 * @example

 co(function * () {
  let lump = clayLump({
  // Options here
  })
  yield lump.open()
}).catch((err) => console.error(err))

 */
'use strict'

const ClayLump = require('./clay_lump')

/** @lends clayLump */
function create (...args) {
  return new ClayLump(...args)
}

module.exports = create
