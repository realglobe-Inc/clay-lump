clay-lump
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_com_shield_url]][bd_travis_com_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/clay-lump
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/clay-lump
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/clay-lump.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/clay-lump
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/clay-lump.svg?token=aeFzCpBZebyaRijpCFmm
[bd_license_url]: https://github.com/realglobe-Inc/clay-lump/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/clay-lump
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/clay-lump.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/clay-lump.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/clay-lump
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/clay-lump.svg
[bd_npm_url]: http://www.npmjs.org/package/clay-lump
[bd_npm_shield_url]: http://img.shields.io/npm/v/clay-lump.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Lump of clay-db

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install clay-lump --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const clayLump = require('clay-lump')
const co = require('co')

co(function * () {
  let lump01 = clayLump('lump01')

  // Access to data sheet
  {
    const Dog = yield lump01.resource('Dog@default')

    let john = yield Dog.create({ name: 'john', type: 'Saint Bernard', age: 3 })
    console.log(john) // -> { id: '1a6358694adb4aa89c15f94be50d5b78', name: 'john', type: 'Saint Bernard', age: 3 }

    let dogs = yield Dog.list({
      filter: { type: 'Saint Bernard' },
      page: { number: 1, size: 25 }
    })
  }

  let lump02 = clayLump('lump02')
  {
    const Dog = yield lump02.resource('Dog@foo')
    let bess = yield Dog.create({ name: 'bess', type: 'Chihuahua', age: 1 })

    const Dog2 = yield lump02.resource('Dog@bar')
    let bess2 = yield Dog.create({ name: 'bess2', type: 'Chihuahua', age: 1 })
  }

  // Sync lumps01 to lump02
  yield lump02.sync(lump01) // Both lumps will be updated
  {
    const Dog = yield lump02.resource('Dog')
    let [ john ] = (yield Dog.list({ filter: { name: 'john' } })).entities // Synced from lump01
    console.log(john) // -> { id: '1a6358694adb4aa89c15f94be50d5b78', name: 'john', type: 'Saint Bernard', age: 3 }
  }
}).catch((err) => console.error(err))

```

For more detail, see [API Guide](./doc/api/api.md)


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [Apache-2.0 License](https://github.com/realglobe-Inc/clay-lump/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [ClayDB][clay_d_b_url]

[clay_d_b_url]: https://github.com/realglobe-Inc/claydb

<!-- Links End -->
