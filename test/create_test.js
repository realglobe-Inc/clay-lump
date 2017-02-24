/**
 * Test case for create.
 * Runs with mocha.
 */
'use strict'

const create = require('../lib/create.js')
const { ok } = require('assert')
const co = require('co')

describe('create', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Create', () => co(function * () {
    let created = create()
    ok(created)
  }))
})

/* global describe, before, after, it */
