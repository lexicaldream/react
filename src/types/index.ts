import * as R from 'react'

// const mapIterable = <A, B>(
//   iterable: Iterable<A>,
//   f: (a: A, i: number) => B
// ): Iterable<B> => ({
//   [Symbol.iterator]() {
//     const iterator = iterable[Symbol.iterator]()
//     let i = 0
//     return {
//       next() {
//         const result = iterator.next()
//         if (result.done) {
//           return { done: true, value: undefined }
//         }
//         return { done: false, value: f(result.value, i++) }
//       }
//     }
//   }
// })

// class KeyedList<A extends KeysafeNode> implements Iterable<A> {
//   constructor(readonly keyedChildren: Iterable<[string, A]>) {}

//   [Symbol.iterator](): Iterator<A, unknown, undefined> {
//     return mapIterable(this.keyedChildren, ([key, a]) =>
//       typeof a === 'string' ||
//       typeof a === 'number' ||
//       typeof a === 'boolean' ||
//       a instanceof KeyedList ||
//       a === null ||
//       a === undefined
//         ? a
//         : (R.cloneElement(a, { key }) as A)
//     )[Symbol.iterator]()
//   }
// }

export type PrimitiveNode = boolean | number | string
export type NullishNode = undefined | null
export type NullablePrimitiveNode = PrimitiveNode | NullishNode

export type ElementNode = R.ReactElement | R.ReactPortal

export interface KeyedElement<
  P = unknown,
  T extends string | R.JSXElementConstructor<unknown> =
    | string
    | R.JSXElementConstructor<unknown>
> extends R.ReactElement<P, T> {
  key: string
}

export interface KeyedPortal extends R.ReactPortal {
  key: string
}

export type SomeNode = PrimitiveNode | ElementNode | Iterable<SomeNode>

export type KeyedNode =
  | NullishNode
  | PrimitiveNode
  | KeyedElement
  | KeyedPortal
  | Iterable<KeyedNode>

export type ChildNode =
  | NullishNode
  | PrimitiveNode
  | ElementNode
  | Iterable<KeyedNode>

export type Simplify<A> = {
  [K in keyof A]: A[K]
} extends infer B
  ? B
  : never

export type UnsafeReactChildrenProp = {
  readonly children?: ReadonlyArray<R.ReactNode>
}

export type KeysafeReactChildrenProp = {
  readonly children?: ReadonlyArray<ChildNode>
}

export type ReactChildrenProp = KeysafeReactChildrenProp

export type ChildrenProp = {
  readonly children?: ReadonlyArray<unknown>
}

export type Erase<A> = { [K in keyof A]: never }

export type Conform<A, B> = Pick<B, Extract<keyof A, keyof B>>

export type Expect<T extends true> = T

export type Eq<A, B> = [A] extends [B] ? ([B] extends [A] ? true : '!>') : '!<'

export type Extends<A, B> = [A] extends [B] ? true : '!<'

// From https://stackoverflow.com/a/56620917
export type Exactly<T, U> = T & Record<Exclude<keyof U, keyof T>, never>
