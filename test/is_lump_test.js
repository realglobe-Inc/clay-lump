/**
 * Test case for isLump.
 * Runs with mocha.
 */
'use strict'

const isLump = require('../lib/is_lump.js')
const ClayLump = require('../lib/clay_lump')
const { ok } = require('assert')
const co = require('co')

describe('is-lump', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Is lump', () => co(function * () {
    ok(isLump(new ClayLump()))
    ok(isLump({ $$lump: true }))
  }))
})

/* global describe, before, after, it */
