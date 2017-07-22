/**
 * Test case for driveMix.
 * Runs with mocha.
 */
'use strict'

const driveMix = require('../lib/mixins/drive_mix.js')
const {ok} = require('assert')

describe('drive-mix', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Drive mix', async () => {
    const mixed = driveMix(class {})
    ok(mixed)
  })
})

/* global describe, before, after, it */
