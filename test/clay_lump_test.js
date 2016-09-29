/**
 * Test case for clayLump.
 * Runs with mocha.
 */
'use strict'

const ClayLump = require('../lib/clay_lump.js')
const assert = require('assert')
const asleep = require('asleep')
const co = require('co')

describe('clay-lump', function () {
  this.timeout(3000)

  before(() => co(function * () {
  }))

  after(() => co(function * () {

  }))

  it('Clay lump', () => co(function * () {
    let lump01 = new ClayLump()
    let lump02 = new ClayLump()
    yield lump01.open()
    yield lump02.open()

    {
      let dogs = lump01.sheet('dogs')
      assert.ok(dogs)

      yield dogs.set('John', { type: 'Saint Bernard', age: 3 })
      let John = yield dogs.get('John')
      assert.deepEqual(John, { type: 'Saint Bernard', age: 3 })

      let keys = yield dogs.keys()
      assert.deepEqual(keys, [ 'John' ])

      let all = yield dogs.all()
      assert.deepEqual(all, [ { type: 'Saint Bernard', age: 3 } ])

      yield dogs.set('Vicky', { type: 'Chihuahua', age: 1 })
    }

    yield asleep(10)
    {
      let dogs = lump02.sheet('dogs')
      yield dogs.set('Vicky', { type: 'Chihuahua', age: 2 })

      let description = yield lump02.describe()
      assert.deepEqual(description.sheets, { shared: [ 'dogs' ], private: [ '$$config' ] })
    }

    yield lump02.sync(lump01)
    {
      let dogs = lump01.sheet('dogs')
      let Vicky = yield dogs.get('Vicky')
      assert.equal(Vicky.age, 2) // Updated from lump02
    }

    yield lump01.close()
    yield lump02.close()
  }))
})

/* global describe, before, after, it */
