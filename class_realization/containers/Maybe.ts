import { curry } from '../../functions/curry.js';
import { liftA2 } from '../functions/lift.js';
import { TraversableMixin } from '../structures/functors/foldable-traversable.js';
import { Applicative, Monad } from '../structures/functors/pointed-monad.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Maybe<T> extends TraversableMixin(Monad<any>) {
  constructor(val: T) {
    super(val);
  }

  static of<U>(val: U): Maybe<U> {
    return new Maybe(val);
  }

  static nothing<A>(): Maybe<A> {
    return new Maybe<A>(null as A);
  }

  get isNothing() {
    return this.value === null || this.value === undefined;
  }

  map<U>(fn: (a: T) => U): Maybe<U> {
    return this.isNothing ? Maybe.nothing() : Maybe.of(fn(this.value));
  }

  ap<A, B>(this: Maybe<(a: A) => B>, other: Maybe<A>): Maybe<B> {
    return this.isNothing ? Maybe.nothing() : other.map(this.value);
  }

  chain<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
    return this.isNothing ? Maybe.nothing() : this.map(fn).join();
  }

  join<U>(this: Maybe<Maybe<U>>): Maybe<U> {
    return this.isNothing ? Maybe.nothing() : this.value;
  }

  traverse<U>(
    of: <V>(val: V) => Applicative<V>,
    fn: (val: T) => Applicative<U>,
  ): Applicative<Maybe<U>> {
    return this.isNothing ? of(Maybe.nothing()) : fn(this.value).map(Maybe.of);
  }
  reduce<R>(fn: (acc: R, val: T) => R, initialValue: R): R {
    return this.isNothing ? initialValue : fn(initialValue, this.value);
  }
}

const t = liftA2(
  (a: number) => (b: number) => a + b,
  Maybe.of(12),
  Maybe.of(12),
);

const u = Maybe.of(12)
  .map((a: number) => (b: number) => a + b)
  .ap(Maybe.of(152));

const c = curry(<A,B,C>(a: A, b: B, c: C) => 'lol')(1,)