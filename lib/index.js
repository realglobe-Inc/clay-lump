/**
 * Lump of clay-db
 * @module clay-lump
 * @version 4.2.24
 */

'use strict'

const ClayLump = require('./clay_lump')
const isLump = require('./is_lump')
const create = require('./create')
const constants = require('./constants')
const Types = require('./types')

let lib = create.bind(this)

Object.assign(lib, constants, ClayLump, {
  ClayLump,
  isLump,
  constants,
  Types
})

module.exports = lib
