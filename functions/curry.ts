/* eslint-disable @typescript-eslint/no-explicit-any */

export type CurryType<P extends unknown[], R> = <T extends unknown[]>(
  ...args: T
) => P extends [...T, ...infer Rest]
  ? Rest['length'] extends 0
    ? R
    : CurryType<Rest, R>
  : never;

export type Curried<F extends (...args: any[]) => any> = F extends (
  ...args: infer P
) => infer R
  ? CurryType<P, R>
  : never;

export function curry<F extends (...args: any[]) => unknown>(
  fn: F,
): Curried<F> {
  function curried(this: unknown, ...args: unknown[]): unknown {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return (...next: unknown[]) => curried.apply(this, [...args, ...next]);
  }

  return curried as Curried<F>;
}
