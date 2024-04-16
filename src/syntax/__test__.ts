import * as assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import * as R from 'react'
import * as render from 'react-test-renderer'
import { h, h_ } from './index'
import { SomeNode } from '../types'

type AlphaProps = {
  requiredA: string
  requiredB: string
  optionalA?: string
  optionalB?: string
  children: ReadonlyArray<SomeNode>
}

const Alpha = (props: AlphaProps) =>
  R.createElement(
    'article',
    {},
    R.createElement('div', { className: 'requiredA' }, props.requiredA),
    R.createElement('div', { className: 'requiredB' }, props.requiredB),
    R.createElement('div', { className: 'optionalA' }, props.optionalA),
    R.createElement('div', { className: 'optionalB' }, props.optionalB),
    ...props.children
  )

// Runtime tests

/* eslint-disable @typescript-eslint/no-floating-promises */
describe('h: create element', () => {
  const $ = render.create(
    h(Alpha, {
      requiredA: 'A',
      requiredB: 'B',
      optionalA: 'a',
      children: [h('span', { children: ['b'] })]
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
    children: [h('span', { id: 'span1' }) as SomeNode]
  })
  const c = b({ optionalA: 'z', children: [h('span', { id: 'span2' })] })
  const d = b(p => ({
    ...p,
    requiredA: 'Z',
    children: [...p.children, h('span', { id: 'span3' })]
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
