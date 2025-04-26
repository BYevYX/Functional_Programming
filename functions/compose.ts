import { AnyFn } from '../types/fn.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
type ComposeTwo<F extends AnyFn, G extends AnyFn> = G extends (
  ...args: infer A
) => infer Rg
  ? F extends (arg: Rg) => infer Rf
    ? (...args: A) => Rf
    : never
  : never;

type ComposeMany<Fns extends AnyFn[]> = Fns extends [
  infer F1,
  infer F2,
  ...infer Rest,
]
  ? ComposeMany<
      [
        ComposeTwo<Extract<F1, AnyFn>, Extract<F2, AnyFn>>,
        ...Extract<Rest, AnyFn[]>,
      ]
    >
  : Fns extends [infer F]
    ? Extract<F, AnyFn>
    : never;

export function compose<Fns extends AnyFn[]>(...fns: Fns): ComposeMany<Fns> {
  return ((...args: any[]) =>
    fns.reduceRight((res, fn) => [fn(...res)], args)[0]) as any;
}
