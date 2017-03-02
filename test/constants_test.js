/**
 * Test case for constants.
 * Runs with mocha.
 */
'use strict'

const constants = require('../lib/constants.js')
const assert = require('assert')
const co = require('co')

describe('constants', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Constants', () => co(function * () {
    for (let name of Object.keys(constants)) {
      assert.ok(constants[ name ])
    }
  }))
})

/* global describe, before, after, it */
