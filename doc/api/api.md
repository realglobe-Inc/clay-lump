# clay-lump@4.2.29

Lump of clay-db

+ Functions
  + [create()](#clay-lump-function-create)
  + [isLump(instance)](#clay-lump-function-is-lump)
+ [`ClayLump`](#clay-lump-class) Class
  + [new ClayLump(name, options)](#clay-lump-class-clay-lump-constructor)
  + [lump.sync(lump)](#clay-lump-class-clay-lump-sync)
  + [lump.assert()](#clay-lump-class-clay-lump-assert)
  + [lump.dump(dirname, options)](#clay-lump-class-clay-lump-dump)
  + [lump.restore(dirname, options)](#clay-lump-class-clay-lump-restore)
  + [lump.close()](#clay-lump-class-clay-lump-close)
  + [lump.sync(lump)](#clay-lump-class-clay-lump-sync)
  + [lump.assert()](#clay-lump-class-clay-lump-assert)
  + [lump.dump(dirname, options)](#clay-lump-class-clay-lump-dump)
  + [lump.restore(dirname, options)](#clay-lump-class-clay-lump-restore)
  + [lump.close()](#clay-lump-class-clay-lump-close)
  + [lump.registerPolicies(policies)](#clay-lump-class-clay-lump-registerPolicies)
  + [lump.registerPolicy(name, policy)](#clay-lump-class-clay-lump-registerPolicy)
  + [lump.getPolicy(name)](#clay-lump-class-clay-lump-getPolicy)
  + [lump.registerDriver(driver)](#clay-lump-class-clay-lump-registerDriver)
  + [lump.merge(lump, options)](#clay-lump-class-clay-lump-merge)
  + [lump.mergeResource(resource)](#clay-lump-class-clay-lump-mergeResource)
  + [lump.resource(resourceName, options)](#clay-lump-class-clay-lump-resource)
  + [lump.setResource(resourceName, resource)](#clay-lump-class-clay-lump-setResource)
  + [lump.getResource(resourceName)](#clay-lump-class-clay-lump-getResource)
  + [lump.resourceNames()](#clay-lump-class-clay-lump-resourceNames)
+ [`DriverMixed`](#clay-lump-class) Class
  + [new DriverMixed()](#clay-lump-class-driver-mixed-constructor)
  + [mixed.registerDriver(driver)](#clay-lump-class-driver-mixed-registerDriver)
+ [`MergeMixed`](#clay-lump-class) Class
  + [new MergeMixed()](#clay-lump-class-merge-mixed-constructor)
  + [mixed.merge(lump, options)](#clay-lump-class-merge-mixed-merge)
  + [mixed.mergeResource(resource)](#clay-lump-class-merge-mixed-mergeResource)
+ [`PolicyMixed`](#clay-lump-class) Class
  + [new PolicyMixed()](#clay-lump-class-policy-mixed-constructor)
  + [mixed.registerPolicies(policies)](#clay-lump-class-policy-mixed-registerPolicies)
  + [mixed.registerPolicy(name, policy)](#clay-lump-class-policy-mixed-registerPolicy)
  + [mixed.getPolicy(name)](#clay-lump-class-policy-mixed-getPolicy)
+ [`ResourceMixed`](#clay-lump-class) Class
  + [new ResourceMixed()](#clay-lump-class-resource-mixed-constructor)
  + [mixed.resource(resourceName, options)](#clay-lump-class-resource-mixed-resource)
  + [mixed.setResource(resourceName, resource)](#clay-lump-class-resource-mixed-setResource)
  + [mixed.getResource(resourceName)](#clay-lump-class-resource-mixed-getResource)
  + [mixed.resourceNames()](#clay-lump-class-resource-mixed-resourceNames)

## Functions

<a class='md-heading-link' name="clay-lump-function-create" ></a>

### create() -> `ClayLump`

Create a lump instance. Just an alias of `new ClayLump(config)`
**Example**:

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



<a class='md-heading-link' name="clay-lump-class"></a>

## `ClayLump` Class

Local storage of Clay DB.

**Extends**:

+ `PolicyMixed`
+ `DriverMixed`
+ `MergeMixed`
+ `ResourceMixed`



<a class='md-heading-link' name="clay-lump-class-clay-lump-constructor" ></a>

### new ClayLump(name, options)

Constructor of ClayLump class

| Param | Type | Description |
| ----- | --- | -------- |
| name | string | Lump name |
| options | Object | Optional settings |
| options.driver | Driver | Clay driver instance |


<a class='md-heading-link' name="clay-lump-class-clay-lump-sync" ></a>

### lump.sync(lump) -> `Promise`

Two-way merge

| Param | Type | Description |
| ----- | --- | -------- |
| lump | ClayLump | Lump to sync |


<a class='md-heading-link' name="clay-lump-class-clay-lump-assert" ></a>

### lump.assert()

Asset lump state and throw error if something is wrong

<a class='md-heading-link' name="clay-lump-class-clay-lump-dump" ></a>

### lump.dump(dirname, options) -> `Promise`

Dump database

| Param | Type | Description |
| ----- | --- | -------- |
| dirname | string | Directory name to dump |
| options | Object | Optional settings |
| options.force | boolean | Override if already exists |


<a class='md-heading-link' name="clay-lump-class-clay-lump-restore" ></a>

### lump.restore(dirname, options) -> `Promise`

Restore database

| Param | Type | Description |
| ----- | --- | -------- |
| dirname | string | Directory name of the dump |
| options | Object | Optional settings |
| options.force | boolean | Override existing data |


<a class='md-heading-link' name="clay-lump-class-clay-lump-close" ></a>

### lump.close() -> `Promise`

Close database

<a class='md-heading-link' name="clay-lump-class-clay-lump-sync" ></a>

### lump.sync(lump) -> `Promise`

Two-way merge

| Param | Type | Description |
| ----- | --- | -------- |
| lump | ClayLump | Lump to sync |


<a class='md-heading-link' name="clay-lump-class-clay-lump-assert" ></a>

### lump.assert()

Asset lump state and throw error if something is wrong

<a class='md-heading-link' name="clay-lump-class-clay-lump-dump" ></a>

### lump.dump(dirname, options) -> `Promise`

Dump database

| Param | Type | Description |
| ----- | --- | -------- |
| dirname | string | Directory name to dump |
| options | Object | Optional settings |
| options.force | boolean | Override if already exists |


<a class='md-heading-link' name="clay-lump-class-clay-lump-restore" ></a>

### lump.restore(dirname, options) -> `Promise`

Restore database

| Param | Type | Description |
| ----- | --- | -------- |
| dirname | string | Directory name of the dump |
| options | Object | Optional settings |
| options.force | boolean | Override existing data |


<a class='md-heading-link' name="clay-lump-class-clay-lump-close" ></a>

### lump.close() -> `Promise`

Close database

<a class='md-heading-link' name="clay-lump-class-clay-lump-registerPolicies" ></a>

### lump.registerPolicies(policies)

Register policies

| Param | Type | Description |
| ----- | --- | -------- |
| policies | Object | Policies to register |


<a class='md-heading-link' name="clay-lump-class-clay-lump-registerPolicy" ></a>

### lump.registerPolicy(name, policy)

Register a policy

| Param | Type | Description |
| ----- | --- | -------- |
| name | string | Resource name to apply policy |
| policy | ClayPolicy | Policies to register |


<a class='md-heading-link' name="clay-lump-class-clay-lump-getPolicy" ></a>

### lump.getPolicy(name) -> `ClayPolicy`

Get a policy

| Param | Type | Description |
| ----- | --- | -------- |
| name | string | Name of policy |


<a class='md-heading-link' name="clay-lump-class-clay-lump-registerDriver" ></a>

### lump.registerDriver(driver)

Register a driver

| Param | Type | Description |
| ----- | --- | -------- |
| driver | Driver | Driver to register |


<a class='md-heading-link' name="clay-lump-class-clay-lump-merge" ></a>

### lump.merge(lump, options) -> `Promise`

Merge another lump

| Param | Type | Description |
| ----- | --- | -------- |
| lump | ClayLump | Lump to merge |
| options | Object | Optional settings |


<a class='md-heading-link' name="clay-lump-class-clay-lump-mergeResource" ></a>

### lump.mergeResource(resource) -> `Promise`

Merge a resource

| Param | Type | Description |
| ----- | --- | -------- |
| resource | ClayResource | Resource to merge |


<a class='md-heading-link' name="clay-lump-class-clay-lump-resource" ></a>

### lump.resource(resourceName, options) -> `ClayResource`

Get a resource with name

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string,Object | Name of resource |
| options | Object | Optional settings |
| options.renew | boolean | Use no cache |


<a class='md-heading-link' name="clay-lump-class-clay-lump-setResource" ></a>

### lump.setResource(resourceName, resource) -> `ResourceMixed`

Set resource with name

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| resource | ClayResource | Resource to set |


<a class='md-heading-link' name="clay-lump-class-clay-lump-getResource" ></a>

### lump.getResource(resourceName) -> `ClayResource`

Get resource by name

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |


<a class='md-heading-link' name="clay-lump-class-clay-lump-resourceNames" ></a>

### lump.resourceNames() -> `Promise.<Array.<string>>`

Get all resource names
Return all resources

<a class='md-heading-link' name="clay-lump-class"></a>

## `DriverMixed` Class






<a class='md-heading-link' name="clay-lump-class-driver-mixed-constructor" ></a>

### new DriverMixed()

Constructor of DriverMixed class



<a class='md-heading-link' name="clay-lump-class-driver-mixed-registerDriver" ></a>

### mixed.registerDriver(driver)

Register a driver

| Param | Type | Description |
| ----- | --- | -------- |
| driver | Driver | Driver to register |


<a class='md-heading-link' name="clay-lump-class"></a>

## `MergeMixed` Class






<a class='md-heading-link' name="clay-lump-class-merge-mixed-constructor" ></a>

### new MergeMixed()

Constructor of MergeMixed class



<a class='md-heading-link' name="clay-lump-class-merge-mixed-merge" ></a>

### mixed.merge(lump, options) -> `Promise`

Merge another lump

| Param | Type | Description |
| ----- | --- | -------- |
| lump | ClayLump | Lump to merge |
| options | Object | Optional settings |


<a class='md-heading-link' name="clay-lump-class-merge-mixed-mergeResource" ></a>

### mixed.mergeResource(resource) -> `Promise`

Merge a resource

| Param | Type | Description |
| ----- | --- | -------- |
| resource | ClayResource | Resource to merge |


<a class='md-heading-link' name="clay-lump-class"></a>

## `PolicyMixed` Class






<a class='md-heading-link' name="clay-lump-class-policy-mixed-constructor" ></a>

### new PolicyMixed()

Constructor of PolicyMixed class



<a class='md-heading-link' name="clay-lump-class-policy-mixed-registerPolicies" ></a>

### mixed.registerPolicies(policies)

Register policies

| Param | Type | Description |
| ----- | --- | -------- |
| policies | Object | Policies to register |


<a class='md-heading-link' name="clay-lump-class-policy-mixed-registerPolicy" ></a>

### mixed.registerPolicy(name, policy)

Register a policy

| Param | Type | Description |
| ----- | --- | -------- |
| name | string | Resource name to apply policy |
| policy | ClayPolicy | Policies to register |


<a class='md-heading-link' name="clay-lump-class-policy-mixed-getPolicy" ></a>

### mixed.getPolicy(name) -> `ClayPolicy`

Get a policy

| Param | Type | Description |
| ----- | --- | -------- |
| name | string | Name of policy |


<a class='md-heading-link' name="clay-lump-class"></a>

## `ResourceMixed` Class






<a class='md-heading-link' name="clay-lump-class-resource-mixed-constructor" ></a>

### new ResourceMixed()

Constructor of ResourceMixed class



<a class='md-heading-link' name="clay-lump-class-resource-mixed-resource" ></a>

### mixed.resource(resourceName, options) -> `ClayResource`

Get a resource with name

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string,Object | Name of resource |
| options | Object | Optional settings |
| options.renew | boolean | Use no cache |


<a class='md-heading-link' name="clay-lump-class-resource-mixed-setResource" ></a>

### mixed.setResource(resourceName, resource) -> `ResourceMixed`

Set resource with name

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| resource | ClayResource | Resource to set |


<a class='md-heading-link' name="clay-lump-class-resource-mixed-getResource" ></a>

### mixed.getResource(resourceName) -> `ClayResource`

Get resource by name

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |


<a class='md-heading-link' name="clay-lump-class-resource-mixed-resourceNames" ></a>

### mixed.resourceNames() -> `Promise.<Array.<string>>`

Get all resource names
Return all resources



