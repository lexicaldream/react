import * as R from 'react'
import { LazyNode } from './LazyNode'
import { LazyElement } from './LazyElement'

export type CreateLazyElement = {
  <
    SuppliedProps extends Partial<
      R.InputHTMLAttributes<HTMLInputElement> &
        R.ClassAttributes<HTMLInputElement> & {
          children?: ReadonlyArray<R.ReactNode>
        }
    >
  >(
    type: 'input',
    props: SuppliedProps,
    ...children: Array<R.ReactNode | LazyNode>
  ): LazyElement<
    R.DetailedReactHTMLElement<
      R.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    R.InputHTMLAttributes<HTMLInputElement> &
      R.ClassAttributes<HTMLInputElement>,
    SuppliedProps
  >

  <
    Props extends R.HTMLAttributes<T>,
    SuppliedProps extends Partial<
      R.ClassAttributes<T> &
        Props & {
          children?: ReadonlyArray<R.ReactNode>
        }
    >,
    T extends HTMLElement
  >(
    type: keyof R.ReactHTML,
    props: SuppliedProps
  ): LazyElement<
    R.DetailedReactHTMLElement<Props, T>,
    R.ClassAttributes<T> & Props,
    SuppliedProps
  >

  <
    Props extends R.SVGAttributes<T>,
    SuppliedProps extends Partial<
      R.ClassAttributes<T> &
        Props & {
          children?: ReadonlyArray<R.ReactNode>
        }
    >,
    T extends SVGElement
  >(
    type: keyof R.ReactSVG,
    props: SuppliedProps
  ): LazyElement<R.ReactSVGElement, R.ClassAttributes<T> & Props, SuppliedProps>

  <
    Props extends R.DOMAttributes<T>,
    SuppliedProps extends Partial<
      R.ClassAttributes<T> &
        Props & {
          children?: ReadonlyArray<R.ReactNode>
        }
    >,
    T extends Element
  >(
    type: string,
    props: SuppliedProps
  ): LazyElement<
    R.DOMElement<Props, T>,
    R.ClassAttributes<T> & Props,
    SuppliedProps
  >

  // Custom components

  <Props extends object, SuppliedProps extends Partial<R.Attributes & Props>>(
    type: R.FunctionComponent<Props>,
    props: SuppliedProps
  ): LazyElement<
    R.FunctionComponentElement<Props>,
    R.Attributes & Props,
    SuppliedProps
  >

  <
    Props extends object,
    SuppliedProps extends Partial<R.ClassAttributes<T> & Props>,
    T extends R.Component<Props, R.ComponentState>,
    C extends R.ComponentClass<Props>
  >(
    type: R.ClassType<Props, T, C>,
    props: SuppliedProps
  ): LazyElement<
    R.CElement<Props, T>,
    R.ClassAttributes<T> & Props,
    SuppliedProps
  >

  <Props extends object, SuppliedProps extends Partial<R.Attributes & Props>>(
    type: R.FunctionComponent<Props> | R.ComponentClass<Props> | string,
    props: SuppliedProps
  ): LazyElement<R.ReactElement<Props>, R.Attributes & Props, SuppliedProps>
}
