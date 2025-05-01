export interface Functor<T> {
  readonly _value: T;
  get value(): T;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map<U>(fn: (val: T) => U): Functor<U | ((...args: any[]) => U)>;
}
