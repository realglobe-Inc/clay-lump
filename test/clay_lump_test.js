/**
 * Test case for clayLump.
 * Runs with mocha.
 */
'use strict'

const ClayLump = require('../lib/clay_lump.js')
const {ok, equal, deepEqual} = require('assert')

describe('clay-lump', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Clay lump', async () => {
    let lump = new ClayLump('some-lump', {})
    ok(lump)

    let Toys = lump.resource('Toys')
    ok(Toys)

    let foo = await Toys.create({
      name: 'foo',
      date: new Date()
    })
    ok(foo.id)
    equal(foo.name, 'foo')
  })

  it('Merge lumps', async () => {
    let lump01 = new ClayLump('lump-01', {})
    let lump02 = new ClayLump('lump-02', {})

    {
      const Dog = lump01.resource('Dog')
      await Dog.create({name: 'john', type: 'Saint Bernard', age: 3})
      let dogs = await Dog.list({
        filter: {type: 'Saint Bernard'},
        page: {number: 1, size: 25}
      })
      equal(dogs.meta.total, 1)
      equal(dogs.meta.length, 1)
    }

    {
      const Dog = lump02.resource('Dog')
      let bess = await Dog.create({name: 'bess', type: 'Chihuahua', age: 1})

      // Merge lumps01 to lump02
      await lump02.merge(lump01)
      {
        const Dog = lump02.resource('Dog')
        let dogsMatchJohn = await Dog.list({
          filter: {name: 'john'}
        })

        deepEqual(dogsMatchJohn.meta, {offset: 0, limit: 100, length: 1, total: 1})
        let [john] = dogsMatchJohn.entities // Synced from lump01
        equal(john.name, 'john')

        let bessAfterMerge = await Dog.one(bess.id)
        equal(String(bessAfterMerge.id), String(bess.id))
      }
    }
  })

  it('Auto Refs', async () => {
    let lump01 = new ClayLump('lump-01', {})
    let Org = lump01.resource('Org')
    let User = lump01.resource('User')
    let org01 = await Org.create({name: 'org01'})
    let user01 = await User.create({name: 'user01', org: org01})

    let user01AsOne = await User.one(user01.id)
    equal(user01AsOne.org.name, 'org01')

    deepEqual(lump01.driver._storages.User[user01.id].org, {$ref: `Org#${org01.id}`})
  })

  it('Use policies', async () => {
    let lump01 = new ClayLump('lump-01', {
      policies: {
        User: {
          username: {
            type: 'STRING',
            required: true
          }
        }
      }
    })
    let User = lump01.resource('User')
    let caught
    try {
      await User.create({foo: 'bar'})
    } catch (thrown) {
      caught = thrown
    }
    deepEqual(caught.detail.missing, ['username'])

    let Org = lump01.resource('Org', {
      policy: {
        name: {type: 'STRING'}
      }
    })
    let OrgAgain = lump01.resource('Org')
    equal(Org.policy().toDigest(), OrgAgain.policy().toDigest())

    await lump01.close()
  })
})

/* global describe, before, after, it */
