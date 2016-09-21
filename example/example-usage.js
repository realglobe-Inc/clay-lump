'use strict'

const clayLump = require('clay-lump')
const co = require('co')
const asleep = require('asleep')

co(function * () {
  let lump01 = clayLump()

  // Access to data sheet
  {
    let dogs = lump01.sheet('dogs')
    yield dogs.set('john', { type: 'Saint Bernard', age: 3 })
    let john = yield dogs.get('john')
    console.log(john) // -> { type: 'Saint Bernard', age: 3 }
  }

  yield asleep(10)

  let lump02 = clayLump()
  {
    let dogs = lump02.sheet('dogs')
    yield dogs.set('bess', { type: 'Chihuahua', age: 1 })
  }

  // Sync lumps
  yield lump02.sync(lump01) // Both lumps will be updated
  {
    let dogs = lump02.sheet('dogs')
    let john = dogs.get('john') // Synced from lump01
    console.log(john) // -> { type: 'Saint Bernard', age: 3 }
  }

}).catch((err) => console.error(err))
