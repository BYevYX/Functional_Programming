export abstract class Functor<T> {
  constructor(protected _value: T) {}

  get value() {
    return this._value;
  }

  abstract map<U>(fn: (val: T) => U): Functor<U>;
}
