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
    let lump = new ClayLump('some-lump', {})
    ok(lump)

    let Toys = lump.resource('Toys')
    ok(Toys)

    let foo = yield Toys.create({
      name: 'foo',
      date: new Date()
    })
    ok(foo.id)
    equal(foo.name, 'foo')
  }))

  it('Merge lumps', () => co(function * () {
    let lump01 = new ClayLump('lump-01', {})
    let lump02 = new ClayLump('lump-02', {})

    {
      const Dog = lump01.resource('Dog')
      yield Dog.create({ name: 'john', type: 'Saint Bernard', age: 3 })
      let dogs = yield Dog.list({
        filter: { type: 'Saint Bernard' },
        page: { number: 1, size: 25 }
      })
      equal(dogs.meta.total, 1)
      equal(dogs.meta.length, 1)
    }

    {
      const Dog = lump02.resource('Dog')
      let bess = yield Dog.create({ name: 'bess', type: 'Chihuahua', age: 1 })

      // Merge lumps01 to lump02
      yield lump02.merge(lump01)
      {
        const Dog = lump02.resource('Dog')
        let dogsMatchJohn = (yield Dog.list({
          filter: { name: 'john' }
        }))

        deepEqual(dogsMatchJohn.meta, { offset: 0, limit: 100, length: 1, total: 1 })
        let [ john ] = dogsMatchJohn.entities // Synced from lump01
        equal(john.name, 'john')

        let bessAfterMerge = yield Dog.one(bess.id)
        equal(String(bessAfterMerge.id), String(bess.id))
      }
    }
  }))
})

/* global describe, before, after, it */
