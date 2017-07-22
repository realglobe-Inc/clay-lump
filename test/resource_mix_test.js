/**
 * Test case for resourceMix.
 * Runs with mocha.
 */
'use strict'

const resourceMix = require('../lib/mixins/resource_mix.js')
const clayResource = require('clay-resource')
const {ok} = require('assert')

describe('resource-mix', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Resource mix', async () => {
    const Mixed = resourceMix(class {})
    ok(Mixed)
    let mixed = new Mixed({})
    let fooResource = clayResource({})
    mixed.setResource('foo', fooResource)
    let found = mixed.getResource('foo')
    ok(found)
  })
})

/* global describe, before, after, it */
