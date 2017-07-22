/**
 * Test case for policyMix.
 * Runs with mocha.
 */
'use strict'

const policyMix = require('../lib/mixins/policy_mix.js')

const {ok} = require('assert')

describe('policy-mix', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Policy mix', async () => {
    const Mixed = policyMix(class Hoge {})

    let mixed = new Mixed({})

    ok(mixed)

  })
})

/* global describe, before, after, it */
