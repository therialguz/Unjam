# map

## Functions

### map()

> **map**\<`T`, `U`\>(`arrayOrPromise`, `callbackfn`): `Promise`\<`U`[]\>

Calls a defined callback function on each element of an array and returns a new array with the results.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | The array or Promise of an array to iterate over. |
| `callbackfn` | (`value`, `index`, `array`) => `U` | A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |

#### Returns

`Promise`\<`U`[]\>

A Promise that resolves with a new array containing the results of calling the callbackfn function on each element in the array.

#### Defined in

[src/map/index.ts:10](https://github.com/therialguz/Unjam/blob/9e9381fe8605ec86756f855f0366216b2297b145/src/map/index.ts#L10)