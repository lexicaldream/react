import { RequiredProps } from './Required'

type StillNeeded<Props, SuppliedProps> = Exclude<
  keyof RequiredProps<Props>,
  keyof RequiredProps<SuppliedProps>
>

export type LazyElement<Component, Props, SuppliedProps> = {
  <SuppliedProps2 extends Partial<Props>>(
    props: SuppliedProps2
  ): LazyElement<Component, Props, SuppliedProps & SuppliedProps2>

  <SuppliedProps2 extends Partial<Props>>(
    f: (props: SuppliedProps) => SuppliedProps & SuppliedProps2
  ): LazyElement<Component, Props, SuppliedProps & SuppliedProps2>

  (): [StillNeeded<Props, SuppliedProps>] extends [never]
    ? Component
    : LazyElement<Component, Props, SuppliedProps>

  RequiredKeys: StillNeeded<Props, SuppliedProps>
}
