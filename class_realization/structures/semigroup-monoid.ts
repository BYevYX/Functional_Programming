export abstract class Semigroup<A> {
  abstract concat(a: A, b: A): A;
}

export abstract class Monoid<A> extends Semigroup<A> {
  abstract empty: A;
}
