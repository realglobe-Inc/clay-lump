/**
 * Test case for isLump.
 * Runs with mocha.
 */
'use strict'

const isLump = require('../lib/is_lump.js')
const ClayLump = require('../lib/clay_lump')
const assert = require('assert')
const co = require('co')

describe('is-lump', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Is lump', () => co(function * () {
    let lump = new ClayLump()
    assert.ok(isLump(lump))
    assert.ok(!isLump(ClayLump))
    assert.ok(!isLump('hoge'))
  }))
})

/* global describe, before, after, it */
