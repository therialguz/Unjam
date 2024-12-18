# groupBy

## Functions

### groupBy()

> **groupBy**\<`T`, `U`\>(`arrayOrPromise`, `callbackfn`): `Promise`\<`Map`\<`U`, `T`[]\>\>

Groups the elements of an array based on the result of the callbackfn function.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | The array or Promise of an array to iterate over. |
| `callbackfn` | (`value`, `index`, `array`) => `U` | A function that accepts up to three arguments. The groupBy method calls the callbackfn function one time for each element in the array. |

#### Returns

`Promise`\<`Map`\<`U`, `T`[]\>\>

A Promise that resolves with a Map containing the elements grouped by the key returned by the callbackfn function.

#### Defined in

[src/groupBy/index.ts:10](https://github.com/therialguz/Unjam/blob/d4a4b9bac1809c1eac22f36c6da11daa773b8abc/src/groupBy/index.ts#L10)
