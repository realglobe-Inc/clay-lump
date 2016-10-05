# clay-lump@0.1.1

Lump of clay-db

+ Functions
  + [create(kind, sheetName, config)](#clay-lump-function-create)
  + [isLump(instance)](#clay-lump-function-is-lump)
+ [ClayLump](clay-lump-classes) Class
  + [new ClayLump(config)](#clay-lump-classes-clay-lump-constructor)
  + [lump.sync(lump)](#clay-lump-classes-clay-lump-sync)
  + [lump.describe()](#clay-lump-classes-clay-lump-describe)
  + [lump.open()](#clay-lump-classes-clay-lump-open)
  + [lump.close()](#clay-lump-classes-clay-lump-close)
  + [lump.keyPair()](#clay-lump-classes-clay-lump-keyPair)

## Functions

<a class='md-heading-link' name="clay-lump-function-create" ></a>

### create(kind, sheetName, config) -> `Sheet`

Create a new sheet

| Param | Type | Description |
| ----- | --- | -------- |
| kind | string |  |
| sheetName | string |  |
| config | object |  |

<a class='md-heading-link' name="clay-lump-function-is-lump" ></a>

### isLump(instance) -> `Boolean`

Check if an instance is a lump

| Param | Type | Description |
| ----- | --- | -------- |
| instance | * | Instance to check |



<a class='md-heading-link' name="clay-lump-classes"></a>

## ClayLump Class

Local key value storage of Clay DB.


<a class='md-heading-link' name="clay-lump-classes-clay-lump-constructor" ></a>

### new ClayLump(config)

Constructor of ClayLump class

| Param | Type | Description |
| ----- | --- | -------- |
| config | Object | Lump configuration |
| config.driver | ClayDriver | Driver instance |


<a class='md-heading-link' name="clay-lump-classes-clay-lump-sync" ></a>

### lump.sync(lump) -> `Promise`

Sync with another lump. Both of lumps will be updated

| Param | Type | Description |
| ----- | --- | -------- |
| lump | Object |  |


<a class='md-heading-link' name="clay-lump-classes-clay-lump-describe" ></a>

### lump.describe() -> `Promise`

Describe this lump

<a class='md-heading-link' name="clay-lump-classes-clay-lump-open" ></a>

### lump.open() -> `Promise`

Open this lump.

<a class='md-heading-link' name="clay-lump-classes-clay-lump-close" ></a>

### lump.close() -> `Promise`

Close this lump.

<a class='md-heading-link' name="clay-lump-classes-clay-lump-keyPair" ></a>

### lump.keyPair() -> `Promise.<Object>`

Key pair of this lump.
Generate new one If not exists



