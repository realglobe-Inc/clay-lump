'use strict'

const clayLump = require('clay-lump')
const clayPolicy = require('clay-policy')
const { STRING, DATE } = clayPolicy.Types

async function exampleClayLump () {
  let lump01 = clayLump('lump02', {
    // Restrict policies
    policies: {
      User: clayPolicy({
        username: {
          type: STRING,
          required: true
        },
        birthday: {
          type: DATE
        },
        rank: {
          type: STRING,
          oneOf: [ 'GOLD', 'SLIVER', 'BRONZE' ]
        }
      }),
      /* ... */
    }
  })

  // Access to data sheet
  {
    const User = lump01.resource('User')
    console.log(User.getPolicy()) // -> Returns policy info

    let user01 = await User.create({ username: 'foo', rank: '__INVALID_RANK__' }) // -> Throws policy error
  }
}

exampleClayLump().catch((err) => console.error(err))

