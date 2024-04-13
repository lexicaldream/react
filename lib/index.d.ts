import React, { Dispatch, EffectCallback, MutableRefObject, Ref, RefObject, SetStateAction } from 'react';
import { MemoBrand, Memo, type Primitive } from './memo';
type DependencyList = Array<Primitive | {
    [MemoBrand]: unknown;
}>;
type Overrides = {
    useMemo: <A>(f: () => A, dependencies: DependencyList) => Memo<A>;
    useCallback: <A extends Function>(callback: A, deps: DependencyList) => Memo<A>;
    useEffect: (f: EffectCallback, deps?: DependencyList) => void;
    useLayoutEffect: (f: EffectCallback, deps?: DependencyList) => void;
    useImperativeHandle: <T, R extends T>(ref: Ref<T> | undefined, init: () => R, deps?: DependencyList) => void;
    useInsertionEffect: (effect: EffectCallback, deps?: DependencyList) => void;
    useState: {
        <S>(initialState: S | (() => S)): [Memo<S>, Memo<Dispatch<SetStateAction<S>>>];
        <S = undefined>(): [
            Memo<S | undefined>,
            Memo<Dispatch<SetStateAction<S | undefined>>>
        ];
    };
    useRef: {
        <T>(initialValue: T): Memo<MutableRefObject<T>>;
        <T>(initialValue: T | null): Memo<RefObject<T>>;
        <T = undefined>(): Memo<MutableRefObject<T | undefined>>;
    };
};
type Hidden = Omit<typeof React, keyof Overrides>;
declare const ReactMemo: Hidden & Overrides;
export = ReactMemo;
//# sourceMappingURL=index.d.ts.map