import { expectType, expectError } from 'tsd'
import * as R from 'react'
import { createElement } from './index'

// # Required props

type ComponentWithRequiredProps = { reqA: string }

declare const ComponentWithRequiredProps: (
  props: ComponentWithRequiredProps
) => R.ReactNode

// All required props supplied
expectType<R.FunctionComponentElement<ComponentWithRequiredProps>>(
  createElement(ComponentWithRequiredProps, { reqA: 'a' })
)

// Required prop is missing
expectError(
  createElement(ComponentWithRequiredProps, { requiredPropIsMissing: 'x' })
)

// Extra prop supplied
expectError(
  createElement(ComponentWithRequiredProps, { reqA: 'a', extraProp: 'b' })
)

// Unwanted children supplied
expectError(
  createElement(ComponentWithRequiredProps, { reqA: 'a', children: ['b'] })
)

// # Optional props

type ComponentWithOptionalProps = { optA?: string }

declare const ComponentWithOptionalProps: (
  props: ComponentWithOptionalProps
) => R.ReactNode

// No props supplied
expectType<R.FunctionComponentElement<ComponentWithOptionalProps>>(
  createElement(ComponentWithOptionalProps, {})
)

// All props supplied
expectType<R.FunctionComponentElement<ComponentWithOptionalProps>>(
  createElement(ComponentWithOptionalProps, { optA: 'a' })
)

// Extra prop supplied
expectError(createElement(ComponentWithOptionalProps, { extraProp: 'x' }))

// Unwanted children supplied
expectError(createElement(ComponentWithOptionalProps, { children: ['a'] }))

// # Children

// ## Builtin children handling

// Iterable children elements without keys
expectError(
  createElement('div', {
    children: [[R.createElement('div', {}), R.createElement('div', {})]]
  })
)

// ## "Normal" child array

type ComponentWithChildren = { children: ReadonlyArray<R.ReactNode> }

declare const ComponentWithChildren: (
  props: ComponentWithChildren
) => R.ReactNode

// Children supplied
expectType<R.FunctionComponentElement<ComponentWithChildren>>(
  createElement(ComponentWithChildren, {
    children: ['a', 'b']
  })
)

// Empty children supplied
expectType<R.FunctionComponentElement<ComponentWithChildren>>(
  createElement(ComponentWithChildren, {
    children: []
  })
)

// Children missing
expectError(createElement(ComponentWithChildren, {}))

// Children malformed
expectError(createElement(ComponentWithChildren, { children: 'not an array' }))

// Children maltyped
expectError(createElement(ComponentWithChildren, { children: [new Date()] }))

// ## Tuple children

type ComponentWithChildrenTuple = { children: [number, string] }

declare const ComponentWithChildrenTuple: (
  props: ComponentWithChildrenTuple
) => R.ReactNode

// Children supplied
expectType<R.FunctionComponentElement<ComponentWithChildrenTuple>>(
  createElement(ComponentWithChildrenTuple, {
    children: [1, 'a']
  })
)

// Extra children supplied
expectError(
  createElement(ComponentWithChildrenTuple, {
    children: [1, 'a', 'b']
  })
)

// Not enough children supplied
expectError(
  createElement(ComponentWithChildrenTuple, {
    children: [1]
  })
)
