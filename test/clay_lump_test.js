/**
 * Test case for clayLump.
 * Runs with mocha.
 */
'use strict'

const ClayLump = require('../lib/clay_lump.js')
const assert = require('assert')
const co = require('co')

describe('clay-lump', function () {
  this.timeout(3000)

  before(() => co(function * () {
    let lump = new ClayLump()
    yield lump.open()
    {
      let hoge = lump.sheet('hoge')
      assert.ok(hoge)

      yield hoge.set('foo', 'This is foo')
      let foo = yield hoge.get('foo')
      assert.equal(foo, 'This is foo')
    }
    yield lump.close()
  }))

  after(() => co(function * () {

  }))

  it('Clay lump', () => co(function * () {

  }))
})

/* global describe, before, after, it */
