export interface Semigroup<A> {
  concat(a: A, b: A): A;
}

export interface Monoid<A> extends Semigroup<A> {
  empty: A;
}
