import React, {
  Dispatch,
  EffectCallback,
  MutableRefObject,
  Ref,
  RefObject,
  SetStateAction
} from 'react'

type Primitive = bigint | boolean | null | number | string | symbol | undefined

const MemoBrand: unique symbol = Symbol.for('safer-react/MemoBrand')

export type Memo<A> = A extends Primitive
  ? A
  : A & {
      [MemoBrand]: A
    }

export type Memos<A> = {
  [K in keyof A]: Memo<A[K]>
}

export type Omems<A> = A extends Primitive
  ? A
  : A extends { [MemoBrand]: infer B }
  ? B
  : A extends object
  ? { [K in keyof A]: Omem<A[K]> }
  : A extends never[]
  ? { [K in number]: Omem<A[K]> }
  : never

export type Omem<A> = A extends Primitive
  ? A
  : A extends { [MemoBrand]: infer B }
  ? B
  : never

// eslint-disable-next-line no-constant-condition
if (!true) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const test = <A>(_: Omem<Memo<A>>) => null
  test(3)
  test({ a: 3 })
  // const a = <A>(a: A) => test<A>(a)
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DependencyList = Memo<any>[]

const useMemo: <A>(f: () => A, dependencies: DependencyList) => Memo<A> =
  React.useMemo as never

// eslint-disable-next-line @typescript-eslint/ban-types
const useCallback: <A extends Function>(
  callback: A,
  deps: DependencyList
) => Memo<A> = React.useCallback as never

const useEffect: (f: EffectCallback, deps?: DependencyList) => void =
  React.useEffect as never
const useLayoutEffect: (f: EffectCallback, deps?: DependencyList) => void =
  React.useLayoutEffect as never

const useImperativeHandle: <T, R extends T>(
  ref: Ref<T> | undefined,
  init: () => R,
  deps?: DependencyList
) => void = React.useImperativeHandle as never

const useInsertionEffect: (
  effect: EffectCallback,
  deps?: DependencyList
) => void = React.useInsertionEffect as never

const useState: {
  <S>(initialState: S | (() => S)): [Memo<S>, Memo<Dispatch<SetStateAction<S>>>]
  <S = undefined>(): [
    Memo<S | undefined>,
    Memo<Dispatch<SetStateAction<S | undefined>>>
  ]
} = React.useState as never

const useRef: {
  <T>(initialValue: T): Memo<MutableRefObject<T>>
  <T>(initialValue: T | null): Memo<RefObject<T>>
  <T = undefined>(): Memo<MutableRefObject<T | undefined>>
} = React.useRef as never

const overrides = {
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useInsertionEffect,
  useState,
  useRef
}

type Hidden = Omit<typeof React, keyof typeof overrides>

const ReactMemo: Hidden & typeof overrides = React as never

export default ReactMemo
