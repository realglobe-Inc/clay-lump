/**
 * Test case for create.
 * Runs with mocha.
 */
'use strict'

const create = require('../lib/create.js')
const {ok} = require('assert')

describe('create', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Create', async () => {
    ok(create('foo'))
    ok(create({name: 'foo'}))
  })
})

/* global describe, before, after, it */
