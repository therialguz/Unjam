# cooperate

## Functions

### cooperate()

> **cooperate**\<`T`\>(`callback`, `signal`?): `CooperationPromise`\<`T`\>

Executes a function cooperatively, allowing it to hand off control to the next cooperative function.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `void` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`handoff`) => `Promise`\<`T`\> | The callback function to execute cooperatively. |
| `signal`? | `AbortSignal` | - |

#### Returns

`CooperationPromise`\<`T`\>

A promise that resolves when the cooperation is complete.

#### Defined in

[src/cooperate/index.ts:18](https://github.com/therialguz/Unjam/blob/d4a4b9bac1809c1eac22f36c6da11daa773b8abc/src/cooperate/index.ts#L18)

***

### getCurrentCooperation()

> **getCurrentCooperation**(): `object`

Gets the current cooperation ID and the time when the cooperation started.

#### Returns

`object`

A tuple containing the cooperation ID and the time when the cooperation started.

##### initiator

> **initiator**: `Symbol`

##### startedAt

> **startedAt**: `number`

#### Throws

An error if no cooperation is in progress.

#### Defined in

[src/cooperate/index.ts:116](https://github.com/therialguz/Unjam/blob/d4a4b9bac1809c1eac22f36c6da11daa773b8abc/src/cooperate/index.ts#L116)
