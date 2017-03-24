'use strict'

const clayLump = require('clay-lump')
const { STRING, DATE } = clayLump.PolicyTypes

async function exampleClayLump () {
  let lump02 = clayLump('lump02')

  // Define policy on resource
  lump02.resource('User').policy({
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
  })

  // Use the resource with policy
  {
    const User = lump02.resource('User')
    console.log(User.getPolicy()) // -> Returns policy info

    let user01 = await User.create({ username: 'foo', rank: '__INVALID_RANK__' }) // -> Throws policy error
    /* ... */
  }
}

exampleClayLump().catch((err) => console.error(err))

