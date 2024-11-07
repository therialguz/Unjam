# forEach

## Functions

### forEach()

> **forEach**\<`T`\>(`arrayOrPromise`, `callbackfn`): `Promise`\<`void`\>

Calls a defined callback function on each element of an array.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the elements in the array. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | The array or Promise of an array to iterate over. |
| `callbackfn` | (`value`, `index`, `array`) => `void` | A function that accepts up to three arguments. The forEach method calls the callbackfn function one time for each element in the array. |

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the loop is finished.

#### Remarks

Calls a defined callback function on each element of an array. The forEach method calls the callbackfn function one time for each element in the array.

#### Example

```ts
const array = [1, 2, 3, 4];
await forEach(array, (value) => console.log(value));
// Output:
// 1
// 2
// 3
// 4
```

#### Defined in

[src/forEach/index.ts:27](https://github.com/therialguz/Unjam/blob/9e9381fe8605ec86756f855f0366216b2297b145/src/forEach/index.ts#L27)
