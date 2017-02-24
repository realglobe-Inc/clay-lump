/**
 * Test case for clayLump.
 * Runs with mocha.
 */
'use strict'

const ClayLump = require('../lib/clay_lump.js')
const { ok, equal, deepEqual } = require('assert')
const co = require('co')

describe('clay-lump', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Clay lump', () => co(function * () {
    let lump = new ClayLump({})
    ok(lump)

    let Toys = yield lump.resource('Toys')
    ok(Toys)

    let foo = yield Toys.create({
      name: 'foo'
    })
    ok(foo.id)
    equal(foo.name, 'foo')
  }))

  it('Merge lumps', () => co(function * () {
    let lump01 = new ClayLump({})
    let lump02 = new ClayLump({})

    {
      const Dog = yield lump01.resource('Dog')
      console.log(Dog.name)

      let dogs = yield Dog.list({
        filter: { type: 'Saint Bernard' },
        page: { number: 1, size: 25 }
      })
      let john = yield Dog.create({ name: 'john', type: 'Saint Bernard', age: 3 })
    }

    {
      const Dog = yield lump02.resource('Dog')
      let bess = yield Dog.create({ name: 'bess', type: 'Chihuahua', age: 1 })
    }

    // Merge lumps01 to lump02
    yield lump02.merge(lump01)
    {
      const Dog = yield lump02.resource('Dog')
      let dogs = (yield Dog.list({
        filter: { name: 'john' }
      }))
      console.log('dogs', dogs)
      let [ john ] = dogs.entities // Synced from lump01
      console.log(john) // -> { id: '1a6358694adb4aa89c15f94be50d5b78', name: 'john', type: 'Saint Bernard', age: 3 }
    }
  }))
})

/* global describe, before, after, it */
