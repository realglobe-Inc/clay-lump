/**
 * Lump of clay-db
 * @module clay-lump
 * @version 2.0.2
 */

'use strict'

const ClayLump = require('./clay_lump')
const isLump = require('./is_lump')
const create = require('./create')

let lib = create.bind(this)

Object.assign(lib, ClayLump, {
  ClayLump,
  isLump
})

module.exports = lib
