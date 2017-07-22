/**
 * Test case for constants.
 * Runs with mocha.
 */
'use strict'

const constants = require('../lib/constants.js')
const assert = require('assert')

describe('constants', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Constants', async () => {
    for (let name of Object.keys(constants)) {
      assert.ok(constants[name])
    }
  })
})

/* global describe, before, after, it */
