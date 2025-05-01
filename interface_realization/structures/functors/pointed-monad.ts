/* eslint-disable @typescript-eslint/no-explicit-any */
import { Functor } from './functor.js';

export interface Pointed {
  of<U>(val: U): Functor<U>;
}

export interface Applicative<T> extends Functor<T> {
  map<U>(fn: (val: T) => U): Applicative<U | ((...args: any[]) => U)>;

  ap<A, B>(
    this: Applicative<(a: A) => B>,
    other: Applicative<A>,
  ): Applicative<B>;
}

export interface Monad<T> extends Applicative<T> {
  map<U>(fn: (val: T) => U): Monad<U | ((...args: any[]) => U)>;

  join<U>(this: Monad<Monad<U>>): Monad<U>;
  chain<U>(fn: (value: T) => Monad<U>): Monad<U>;
}
