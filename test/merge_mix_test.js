/**
 * Test case for mergeMix.
 * Runs with mocha.
 */
'use strict'

const mergeMix = require('../lib/mixins/merge_mix.js')
const {ok} = require('assert')

describe('merge-mix', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Merge mix', async () => {
    const mixed = mergeMix(class {})
    ok(mixed)
  })
})

/* global describe, before, after, it */
