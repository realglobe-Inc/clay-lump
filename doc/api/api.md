# clay-lump@3.1.2

Lump of clay-db

+ Functions
  + [create()](#clay-lump-function-create)
  + [isLump(instance)](#clay-lump-function-is-lump)
+ [`ClayLump`](#clay-lump-classes) Class
  + [new ClayLump(name, options)](#clay-lump-classes-clay-lump-constructor)
  + [lump.sync(lump)](#clay-lump-classes-clay-lump-sync)
  + [lump.assert()](#clay-lump-classes-clay-lump-assert)
  + [lump.registerDriver(driver)](#clay-lump-classes-clay-lump-registerDriver)
  + [lump.merge(lump, options)](#clay-lump-classes-clay-lump-merge)
  + [lump.mergeResource(resource)](#clay-lump-classes-clay-lump-mergeResource)
  + [lump.resource(resourceName, options)](#clay-lump-classes-clay-lump-resource)
  + [lump.resourceNames()](#clay-lump-classes-clay-lump-resourceNames)
+ [`DriverMixed`](#clay-lump-classes) Class
  + [new DriverMixed()](#clay-lump-classes-driver-mixed-constructor)
  + [mixed.registerDriver(driver)](#clay-lump-classes-driver-mixed-registerDriver)
+ [`MergeMixed`](#clay-lump-classes) Class
  + [new MergeMixed()](#clay-lump-classes-merge-mixed-constructor)
  + [mixed.merge(lump, options)](#clay-lump-classes-merge-mixed-merge)
  + [mixed.mergeResource(resource)](#clay-lump-classes-merge-mixed-mergeResource)
+ [`ResourceMixed`](#clay-lump-classes) Class
  + [new ResourceMixed()](#clay-lump-classes-resource-mixed-constructor)
  + [mixed.resource(resourceName, options)](#clay-lump-classes-resource-mixed-resource)
  + [mixed.resourceNames()](#clay-lump-classes-resource-mixed-resourceNames)

## Functions

<a class='md-heading-link' name="clay-lump-function-create" ></a>

### create() -> `ClayLump`

Create a lump instance. Just an alias of `new ClayLump(config)`
```javascript
async function tryClayLump () {
   let lump = clayLump({
     // Options here
   })
   const Product = lump.resource('Product')
   // ... //
 }
 tryClayLump()
```
<a class='md-heading-link' name="clay-lump-function-is-lump" ></a>

### isLump(instance) -> `Boolean`

Check if an instance is a lump

| Param | Type | Description |
| ----- | --- | -------- |
| instance | * | Instance to check |



<a class='md-heading-link' name="clay-lump-classes"></a>

## `ClayLump` Class

Local storage of Clay DB.

**Extends**: 

+ `DriverMixed`


+ `MergeMixed`


+ `ResourceMixed`



<a class='md-heading-link' name="clay-lump-classes-clay-lump-constructor" ></a>

### new ClayLump(name, options)

Constructor of ClayLump class

| Param | Type | Description |
| ----- | --- | -------- |
| name | string | Lump name |
| options | Object | Optional settings |
| options.driver | Driver | Clay driver instance |


<a class='md-heading-link' name="clay-lump-classes-clay-lump-sync" ></a>

### lump.sync(lump) -> `Promise`

Two-way merge

| Param | Type | Description |
| ----- | --- | -------- |
| lump | ClayLump | Lump to sync |


<a class='md-heading-link' name="clay-lump-classes-clay-lump-assert" ></a>

### lump.assert()

Asset lump state and throw error if something is wrong

<a class='md-heading-link' name="clay-lump-classes-clay-lump-registerDriver" ></a>

### lump.registerDriver(driver)

Register a driver

| Param | Type | Description |
| ----- | --- | -------- |
| driver | Driver | Driver to register |


<a class='md-heading-link' name="clay-lump-classes-clay-lump-merge" ></a>

### lump.merge(lump, options) -> `Promise`

Merge another lump

| Param | Type | Description |
| ----- | --- | -------- |
| lump | ClayLump | Lump to merge |
| options | Object | Optional settings |


<a class='md-heading-link' name="clay-lump-classes-clay-lump-mergeResource" ></a>

### lump.mergeResource(resource) -> `Promise`

Merge a resource

| Param | Type | Description |
| ----- | --- | -------- |
| resource | ClayResource | Resource to merge |


<a class='md-heading-link' name="clay-lump-classes-clay-lump-resource" ></a>

### lump.resource(resourceName, options) -> `ClayResource`

Get a resource with name

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string,Object | Name of resource |
| options | Object | Optional settings |
| options.renew | boolean | Use no cache |


<a class='md-heading-link' name="clay-lump-classes-clay-lump-resourceNames" ></a>

### lump.resourceNames() -> `Promise.<Array.<ClayResource>>`

Get all resource names
Return all resources

<a class='md-heading-link' name="clay-lump-classes"></a>

## `DriverMixed` Class






<a class='md-heading-link' name="clay-lump-classes-driver-mixed-constructor" ></a>

### new DriverMixed()

Constructor of DriverMixed class



<a class='md-heading-link' name="clay-lump-classes-driver-mixed-registerDriver" ></a>

### mixed.registerDriver(driver)

Register a driver

| Param | Type | Description |
| ----- | --- | -------- |
| driver | Driver | Driver to register |


<a class='md-heading-link' name="clay-lump-classes"></a>

## `MergeMixed` Class






<a class='md-heading-link' name="clay-lump-classes-merge-mixed-constructor" ></a>

### new MergeMixed()

Constructor of MergeMixed class



<a class='md-heading-link' name="clay-lump-classes-merge-mixed-merge" ></a>

### mixed.merge(lump, options) -> `Promise`

Merge another lump

| Param | Type | Description |
| ----- | --- | -------- |
| lump | ClayLump | Lump to merge |
| options | Object | Optional settings |


<a class='md-heading-link' name="clay-lump-classes-merge-mixed-mergeResource" ></a>

### mixed.mergeResource(resource) -> `Promise`

Merge a resource

| Param | Type | Description |
| ----- | --- | -------- |
| resource | ClayResource | Resource to merge |


<a class='md-heading-link' name="clay-lump-classes"></a>

## `ResourceMixed` Class






<a class='md-heading-link' name="clay-lump-classes-resource-mixed-constructor" ></a>

### new ResourceMixed()

Constructor of ResourceMixed class



<a class='md-heading-link' name="clay-lump-classes-resource-mixed-resource" ></a>

### mixed.resource(resourceName, options) -> `ClayResource`

Get a resource with name

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string,Object | Name of resource |
| options | Object | Optional settings |
| options.renew | boolean | Use no cache |


<a class='md-heading-link' name="clay-lump-classes-resource-mixed-resourceNames" ></a>

### mixed.resourceNames() -> `Promise.<Array.<ClayResource>>`

Get all resource names
Return all resources



