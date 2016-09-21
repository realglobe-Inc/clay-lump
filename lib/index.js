/**
 * Lump of clay-db
 * @module clay-lump
 * @version 0.0.2
 */

'use strict'

const ClayLump = require('./sugo_hub')
const create = require('./create')

let lib = create.bind(this)

Object.assign(lib, ClayLump, {
  ClayLump
})

module.exports = lib
