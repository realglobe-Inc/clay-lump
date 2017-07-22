/**
 * Test case for isLump.
 * Runs with mocha.
 */
'use strict'

const isLump = require('../lib/is_lump.js')
const ClayLump = require('../lib/clay_lump')
const {ok} = require('assert')

describe('is-lump', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Is lump', async () => {
    ok(isLump(new ClayLump('Ultra Fruit')))
    ok(isLump({$$lump: true}))
  })
})

/* global describe, before, after, it */
