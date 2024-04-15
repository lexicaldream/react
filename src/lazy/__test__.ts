import { frag, h, h_ } from './index'
import { LazyElement } from '../types/LazyElement'
import * as R from 'react'
import { SomeNode } from '../types'
import { describe, it } from 'node:test'
import * as assert from 'node:assert/strict'
import * as render from 'react-test-renderer'

const noop = <A>(_a?: A): void => undefined

// Type tests

type Expect<T extends true> = T

type Eq<A, B> = [A] extends [B] ? ([B] extends [A] ? true : '!>') : '!<'

type Extends<A, B> = [A] extends [B] ? true : '!<'

type AlphaProps = {
  requiredA: string
  requiredB: string
  optionalA?: string
  optionalB?: string
  children: SomeNode
}

const Alpha = (props: AlphaProps) =>
  R.createElement(
    'article',
    {},
    R.createElement('div', { className: 'requiredA' }, props.requiredA),
    R.createElement('div', { className: 'requiredB' }, props.requiredB),
    R.createElement('div', { className: 'optionalA' }, props.optionalA),
    R.createElement('div', { className: 'optionalB' }, props.optionalB),
    props.children
  )

const alpha = h_(Alpha, { optionalA: 'a' })

const beta = alpha({ optionalB: 'b', children: ['child1'] })

const delta = beta({ requiredA: 'A' })

const gamma = delta({ requiredB: 'B' })

const iota = delta({ requiredB: 'B', children: [gamma()] })

const zeta = R.createElement('div', {
  children: [gamma()]
})

type RequiredAlpha = (typeof alpha)['RequiredKeys']
type RequiredBeta = (typeof beta)['RequiredKeys']
type RequiredDelta = (typeof delta)['RequiredKeys']
type RequiredGamma = (typeof gamma)['RequiredKeys']
type RequiredIota = (typeof iota)['RequiredKeys']

const callAlpha = alpha()
const callBeta = beta()
const callDelta = delta()
const callGamma = gamma()
const callIota = iota()

noop<
  [
    Expect<Eq<RequiredAlpha, 'requiredA' | 'requiredB' | 'children'>>,
    Expect<Eq<RequiredBeta, 'requiredA' | 'requiredB'>>,
    Expect<Eq<RequiredDelta, 'requiredB'>>,
    Expect<Eq<RequiredGamma, never>>,
    Expect<Eq<RequiredIota, never>>,
    Expect<Extends<typeof alpha, LazyElement<unknown, unknown, unknown>>>,
    Expect<Extends<typeof beta, LazyElement<unknown, unknown, unknown>>>,
    Expect<Extends<typeof delta, LazyElement<unknown, unknown, unknown>>>,
    Expect<Extends<typeof gamma, LazyElement<unknown, unknown, unknown>>>,
    Expect<Extends<typeof iota, LazyElement<unknown, unknown, unknown>>>,
    Expect<Extends<typeof callAlpha, LazyElement<unknown, unknown, unknown>>>,
    Expect<Extends<typeof callBeta, LazyElement<unknown, unknown, unknown>>>,
    Expect<Extends<typeof callDelta, LazyElement<unknown, unknown, unknown>>>,
    Expect<Extends<typeof callGamma, R.FunctionComponentElement<AlphaProps>>>,
    Expect<Extends<typeof callIota, R.FunctionComponentElement<AlphaProps>>>,
    Expect<
      Extends<typeof zeta, R.DetailedReactHTMLElement<object, HTMLElement>>
    >
  ]
>()

// Runtime tests

/* eslint-disable @typescript-eslint/no-floating-promises */
describe('h: create element', () => {
  const $ = render.create(
    h(Alpha, {
      requiredA: 'A',
      requiredB: 'B',
      optionalA: 'a',
      children: h('span', { children: 'b' })
    })
  )

  it('contains props', () => {
    const { children: _, ...childlessProps } = $.root.props
    assert.deepEqual(childlessProps, {
      requiredA: 'A',
      requiredB: 'B',
      optionalA: 'a'
    })
  })

  it('contains passed children', () => {
    assert.deepEqual($.root.findByType('span').children, ['b'])
  })

  it('contains internal children', () => {
    assert.equal($.root.findAllByType('div').length, 4)
    assert.deepEqual($.root.findByProps({ className: 'requiredA' }).children, [
      'A'
    ])
    assert.deepEqual($.root.findByProps({ className: 'requiredB' }).children, [
      'B'
    ])
    assert.deepEqual($.root.findByProps({ className: 'optionalA' }).children, [
      'a'
    ])
    assert.deepEqual(
      $.root.findByProps({ className: 'optionalB' }).children,
      []
    )
  })
})

describe('h_: create lazy element', () => {
  const a = h_(Alpha, {
    requiredA: 'A',
    optionalA: 'a'
  })
  const b = a({
    requiredB: 'B',
    children: h('span', { id: 'span1' }) as SomeNode
  })
  const c = b({ optionalA: 'z', children: h('span', { id: 'span2' }) })
  const d = b(p => ({
    ...p,
    requiredA: 'Z',
    children: frag(p.children, h('span', { id: 'span3' }))
  }))

  const rootB = render.create(b()).root
  const rootC = render.create(c()).root
  const rootD = render.create(d()).root

  it('contains correctly overridden props', () => {
    const { children: _b, ...propsB } = rootB.props
    const { children: _c, ...propsC } = rootC.props
    const { children: _d, ...propsD } = rootD.props

    assert.deepEqual(propsB, {
      requiredA: 'A',
      optionalA: 'a',
      requiredB: 'B'
    })
    assert.deepEqual(propsC, {
      requiredA: 'A',
      optionalA: 'z',
      requiredB: 'B'
    })
    assert.deepEqual(propsD, {
      requiredA: 'Z',
      optionalA: 'a',
      requiredB: 'B'
    })
  })

  it('contains correctly overridden children', () => {
    assert.equal(rootB.findAllByProps({ id: 'span1' }).length, 1, 'B has span1')
    assert.equal(rootC.findAllByProps({ id: 'span2' }).length, 1, 'C has span2')
    assert.equal(
      rootC.findAllByProps({ id: 'span1' }).length,
      0,
      'C does not have span1'
    )
    assert.equal(rootD.findAllByProps({ id: 'span1' }).length, 1, 'D has span1')
    assert.equal(rootD.findAllByProps({ id: 'span3' }).length, 1, 'D has span3')
    assert.equal(
      rootD.findAllByProps({ id: 'span2' }).length,
      0,
      'D does not have span2'
    )
  })
})
