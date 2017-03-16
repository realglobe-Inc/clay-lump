/**
 * Test case for driveMix.
 * Runs with mocha.
 */
'use strict'

const driveMix = require('../lib/mixins/drive_mix.js')
const { ok } = require('assert')
const co = require('co')

describe('drive-mix', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Drive mix', () => co(function * () {
    const mixed = driveMix(class {})
    ok(mixed)
  }))
})

/* global describe, before, after, it */
