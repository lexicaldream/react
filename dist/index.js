import React from 'react'
const MemoBrand = Symbol.for('safer-react/MemoBrand')
// eslint-disable-next-line no-constant-condition
if (!true) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const test = _ => null
  test(3)
  test({ a: 3 })
  // const a = <A>(a: A) => test<A>(a)
  /* eslint-enable @typescript-eslint/no-unused-vars */
}
const useMemo = React.useMemo
// eslint-disable-next-line @typescript-eslint/ban-types
const useCallback = React.useCallback
const useEffect = React.useEffect
const useLayoutEffect = React.useLayoutEffect
const useImperativeHandle = React.useImperativeHandle
const useInsertionEffect = React.useInsertionEffect
const useState = React.useState
const useRef = React.useRef
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
const ReactMemo = React
export default ReactMemo
