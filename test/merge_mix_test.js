/**
 * Test case for mergeMix.
 * Runs with mocha.
 */
'use strict'

const mergeMix = require('../lib/mixins/merge_mix.js')
const { ok } = require('assert')
const co = require('co')

describe('merge-mix', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Merge mix', () => co(function * () {
    const mixed = mergeMix(class {})
    ok(mixed)
  }))
})

/* global describe, before, after, it */
