import * as R from 'react'

export type SomeNode =
  | R.ReactElement
  | string
  | number
  | Iterable<SomeNode>
  | R.ReactPortal
  | boolean

export type Simplify<A> = {
  [K in keyof A]: A[K]
} extends infer B
  ? B
  : never

export type ReactChildrenProp = {
  readonly children?: ReadonlyArray<R.ReactNode>
}

export type ChildrenProp = {
  readonly children?: ReadonlyArray<unknown>
}

export type Erase<A> = { [K in keyof A]: never }

export type Conform<A, B> = Pick<B, Extract<keyof A, keyof B>>

export type Expect<T extends true> = T

export type Eq<A, B> = [A] extends [B] ? ([B] extends [A] ? true : '!>') : '!<'

export type Extends<A, B> = [A] extends [B] ? true : '!<'
