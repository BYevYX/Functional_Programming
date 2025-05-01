/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyFn = (...args: any[]) => any;

export type AbstractConstructor<T = object> = abstract new (
  ...args: any[]
) => T;

export type Constructor<T = object> = new (...args: any[]) => T;
