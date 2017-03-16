/**
 * Test case for resourceMix.
 * Runs with mocha.
 */
'use strict'

const resourceMix = require('../lib/mixins/resource_mix.js')
const { ok } = require('assert')
const co = require('co')

describe('resource-mix', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Resource mix', () => co(function * () {
    const Mixed = resourceMix(class {})
    ok(Mixed)
  }))
})

/* global describe, before, after, it */
