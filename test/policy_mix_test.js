/**
 * Test case for policyMix.
 * Runs with mocha.
 */
'use strict'

const policyMix = require('../lib/mixins/policy_mix.js')

const { ok } = require('assert')
const co = require('co')

describe('policy-mix', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Policy mix', () => co(function * () {
    const Mixed = policyMix(class Hoge {})

    let mixed = new Mixed({})

    ok(mixed)

  }))
})

/* global describe, before, after, it */
