'use strict'

const clayLump = require('clay-lump')
const { SqliteDriver } = require('clay-driver-sqlite')

async function exampleClayLump () {
  let lump01 = clayLump('lump01', {
    driver: new SqliteDriver('var/example-lump01.db')
  })

  // Access to data sheet
  {
    const Dog = lump01.resource('Dog@default')

    let john = await Dog.create({ name: 'john', type: 'Saint Bernard', age: 3 })
    console.log(john) // -> { id: '1a6358694adb4aa89c15f94be50d5b78', name: 'john', type: 'Saint Bernard', age: 3 }

    let dogs = await Dog.list({
      filter: { type: 'Saint Bernard' },
      page: { number: 1, size: 25 }
    })
  }

  let lump02 = clayLump('lump02')
  {
    const Dog = lump02.resource('Dog@foo')
    let bess = await Dog.create({ name: 'bess', type: 'Chihuahua', age: 1 })

    const Dog2 = lump02.resource('Dog@bar')
    let bess2 = await Dog.create({ name: 'bess2', type: 'Chihuahua', age: 1 })
  }

  // Sync lumps01 to lump02
  await lump02.sync(lump01) // Both lumps will be updated
  {
    const Dog = lump02.resource('Dog')
    let [ john ] = (await Dog.list({ filter: { name: 'john' } })).entities // Synced from lump01
    console.log(john) // -> { id: '1a6358694adb4aa89c15f94be50d5b78', name: 'john', type: 'Saint Bernard', age: 3 }
  }
}

exampleClayLump().catch((err) => console.error(err))

