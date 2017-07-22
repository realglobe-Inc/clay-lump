'use strict'

const clayLump = require('clay-lump')
const {STRING, DATE} = clayLump.Types

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
      oneOf: ['GOLD', 'SLIVER', 'BRONZE']
    }
  })

  // Use the resource with policy
  {
    const User = lump02.resource('User')
    let user01 = await User.create({username: 'foo', rank: '__INVALID_RANK__'}) // -> Throws policy error
    /* ... */
  }

  // Use policy as validator
  {
    const User = lump02.resource('User')
    let policy = User.getPolicy()
    policy.validateToThrow({foo: 'bar'})
  }
}

exampleClayLump().catch((err) => console.error(err))
