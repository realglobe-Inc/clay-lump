'use strict'

const clayLump = require('clay-lump')
const { ResourceEvents } = clayLump

// Events fired from resource
const {
  ENTITY_CREATE,
  ENTITY_CREATE_BULK,
  ENTITY_UPDATE,
  ENTITY_UPDATE_BULK,
  ENTITY_DESTROY,
  ENTITY_DESTROY_BULK,
  ENTITY_DROP
} = ResourceEvents

async function exampleClayLump () {
  let lump02 = clayLump('lump02')

  // Add listener on resource
  lump02.resource('User')
    .on(ENTITY_CREATE, ({ created }) => { /* ... */ })
    .on(ENTITY_CREATE_BULK, ({ created }) => { /* ... */ })
    .on(ENTITY_UPDATE, ({ id, updated }) => { /* ... */ })
    .on(ENTITY_UPDATE_BULK, ({ ids, updated }) => { /* ... */ })
    .on(ENTITY_DESTROY, ({ id, destroyed }) => { /* ... */ })
    .on(ENTITY_DESTROY_BULK, ({ ids, destroyed }) => { /* ... */ })
    .on(ENTITY_DROP, ({ dropped }) => { /* ... */ })

  // Use the resource with policy
  {
    const User = lump02.resource('User')
    console.log(User.getPolicy()) // -> Returns policy info

    let user01 = await User.create({ username: 'foo', rank: '__INVALID_RANK__' }) // -> Throws policy error
    /* ... */
  }
}

exampleClayLump().catch((err) => console.error(err))

