'use strict'

const clayLump = require('clay-lump')
const co = require('co')

co(function * () {
  let lump01 = clayLump()

  // Access to data sheet
  {
    const Dog = yield lump01.resource('Dog')

    let dogs = yield Dog.list({
      filter: { type: 'Saint Bernard' },
      page: { number: 1, size: 25 }
    })
    let john = yield Dog.create({ name: 'john', type: 'Saint Bernard', age: 3 })
    console.log(john) // -> { id: '1a6358694adb4aa89c15f94be50d5b78', name: 'john', type: 'Saint Bernard', age: 3 }
  }

  let lump02 = clayLump()
  {
    const Dog = yield lump02.resource('Dog')
    let bess = yield Dog.create({ name: 'bess', type: 'Chihuahua', age: 1 })
  }

  // Sync lumps01 to lump02
  yield lump02.sync(lump01) // Both lumps will be updated
  {
    const Dog = yield lump02.resource('Dog')
    let [ john ] = (yield Dog.list({ filter: { name: 'john' } })).entities // Synced from lump01
    console.log(john) // -> { id: '1a6358694adb4aa89c15f94be50d5b78', name: 'john', type: 'Saint Bernard', age: 3 }
  }
}).catch((err) => console.error(err))
