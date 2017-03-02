# clay-lump@1.0.0

Lump of clay-db

+ Functions
  + [isLump(instance)](#clay-lump-function-is-lump)
+ [`ClayLump`](#clay-lump-classes) Class
  + [new ClayLump(config)](#clay-lump-classes-clay-lump-constructor)
  + [lump.sync()](#clay-lump-classes-clay-lump-sync)

## Functions

<a class='md-heading-link' name="clay-lump-function-is-lump" ></a>

### isLump(instance) -> `Boolean`

Check if an instance is a lump

| Param | Type | Description |
| ----- | --- | -------- |
| instance | * | Instance to check |



<a class='md-heading-link' name="clay-lump-classes"></a>

## `ClayLump` Class

Local key value storage of Clay DB.




<a class='md-heading-link' name="clay-lump-classes-clay-lump-constructor" ></a>

### new ClayLump(config)

Constructor of ClayLump class

| Param | Type | Description |
| ----- | --- | -------- |
| config | Object | Lump configuration |
| config.driver | Driver | Clay driver instance |


<a class='md-heading-link' name="clay-lump-classes-clay-lump-sync" ></a>

### lump.sync() -> `Promise`

Two-way merge



