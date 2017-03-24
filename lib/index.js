/**
 * Lump of clay-db
 * @module clay-lump
 * @version 3.1.6
 */

'use strict'

const ClayLump = require('./clay_lump')
const isLump = require('./is_lump')
const create = require('./create')
const constants = require('./constants')

let lib = create.bind(this)

Object.assign(lib, constants, ClayLump, {
  ClayLump,
  isLump,
  constants
})

module.exports = lib
