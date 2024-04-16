import * as R from 'react'
import { ChildrenProp, ReactChildrenProp } from '../types'

type CreateElement = {
  (
    type: 'input',
    props: R.InputHTMLAttributes<HTMLInputElement> &
      R.ClassAttributes<HTMLInputElement> &
      ReactChildrenProp
  ): R.DetailedReactHTMLElement<
    R.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

  <P extends R.HTMLAttributes<T>, T extends HTMLElement>(
    type: keyof R.ReactHTML,
    props: R.ClassAttributes<T> & P & ReactChildrenProp
  ): R.DetailedReactHTMLElement<P, T>

  <P extends R.SVGAttributes<T>, T extends SVGElement>(
    type: keyof R.ReactSVG,
    props: R.ClassAttributes<T> & P & ReactChildrenProp
  ): R.ReactSVGElement

  <P extends R.DOMAttributes<T>, T extends Element>(
    type: string,
    props: R.ClassAttributes<T> & P & ReactChildrenProp
  ): R.DOMElement<P, T>

  // Custom components

  <P extends object>(
    type: R.FunctionComponent<P>,
    props: R.Attributes & P
  ): R.FunctionComponentElement<P>

  <P extends ChildrenProp>(
    type: R.FunctionComponent<P>,
    props: R.Attributes & P
  ): R.FunctionComponentElement<P>

  <
    P extends object,
    T extends R.Component<P, R.ComponentState>,
    C extends R.ComponentClass<P>
  >(
    type: R.ClassType<P, T, C>,
    props: R.ClassAttributes<T> & P
  ): R.CElement<P, T>

  <
    P extends ChildrenProp,
    T extends R.Component<P, R.ComponentState>,
    C extends R.ComponentClass<P>
  >(
    type: R.ClassType<P, T, C>,
    props: R.ClassAttributes<T> & P
  ): R.CElement<P, T>

  <P extends object>(
    type: R.FunctionComponent<P> | R.ComponentClass<P>,
    props: R.Attributes & P
  ): R.ReactElement<P>

  <P extends ChildrenProp>(
    type: R.FunctionComponent<P> | R.ComponentClass<P>,
    props: R.Attributes & P
  ): R.ReactElement<P>
}

export const createElement: CreateElement = ((type: string, props: object) =>
  R.createElement(type, props)) as never
