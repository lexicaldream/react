import React, {
  Dispatch,
  EffectCallback,
  MutableRefObject,
  Ref,
  RefObject,
  SetStateAction
} from 'react'
type Primitive = bigint | boolean | null | number | string | symbol | undefined
declare const MemoBrand: unique symbol
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
  : A extends {
      [MemoBrand]: infer B
    }
  ? B
  : A extends object
  ? {
      [K in keyof A]: Omem<A[K]>
    }
  : A extends never[]
  ? {
      [K in number]: Omem<A[K]>
    }
  : never
export type Omem<A> = A extends Primitive
  ? A
  : A extends {
      [MemoBrand]: infer B
    }
  ? B
  : never
type DependencyList = Memo<never>[]
declare const overrides: {
  useMemo: <A>(f: () => A, dependencies: DependencyList) => Memo<A>
  useCallback: <A_1 extends Function>(
    callback: A_1,
    deps: DependencyList
  ) => Memo<A_1>
  useEffect: (f: EffectCallback, deps?: DependencyList) => void
  useLayoutEffect: (f: EffectCallback, deps?: DependencyList) => void
  useImperativeHandle: <T, R extends T>(
    ref: React.Ref<T> | undefined,
    init: () => R,
    deps?: DependencyList
  ) => void
  useInsertionEffect: (effect: EffectCallback, deps?: DependencyList) => void
  useState: {
    <S>(initialState: S | (() => S)): [
      Memo<S>,
      React.Dispatch<React.SetStateAction<S>> & {
        [MemoBrand]: React.Dispatch<React.SetStateAction<S>>
      }
    ]
    <S_1 = undefined>(): [
      Memo<S_1> | undefined,
      React.Dispatch<React.SetStateAction<S_1 | undefined>> & {
        [MemoBrand]: React.Dispatch<React.SetStateAction<S_1 | undefined>>
      }
    ]
  }
  useRef: {
    <T_1>(initialValue: T_1): React.MutableRefObject<T_1> & {
      [MemoBrand]: React.MutableRefObject<T_1>
    }
    <T_2>(initialValue: T_2 | null): React.RefObject<T_2> & {
      [MemoBrand]: React.RefObject<T_2>
    }
    <T_3 = undefined>(): React.MutableRefObject<T_3 | undefined> & {
      [MemoBrand]: React.MutableRefObject<T_3 | undefined>
    }
  }
}
type Hidden = Omit<typeof React, 'useMemo'>
declare const ReactMemo: Hidden & typeof overrides
export default ReactMemo
//# sourceMappingURL=index.d.ts.map
