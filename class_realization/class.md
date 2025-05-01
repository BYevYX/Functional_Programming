## Реализация на основе классов имеет ряд плюсов и минусов:

### Плюсы

1. можно использовать `protected` и тд для защиты _value
2. можно сразу реализовать базовуе методы и наследовать их

### Минусы

1. Из-за отсутвия наследования от нескольких классов приходится использовать `Mixins` в связи с эти из-за особенностей TS при передаче класса в `Mixin` теряется тип его дженерика
```ts
// Monad< здесь нельзя использовать T >
// из-за этого в наследуемых от Monad классах теряется типизация хранящегося значения _value
class Maybe<T> extends TraversableMixin(Monad<any>) {}
```

2. При реализации унаследованных абстрактных методов контейнеров по типу Maybe приходится немного менять их типизацию
```ts
class Maybe<T> extends TraversableMixin(Monad<any>) {
    // ...

    // унаследованная типизация
    traverse<U>(
        of: <V>(val: V) => Applicative<V>, 
        fn: (val: unknown) => Applicative<U>
    ): Applicative<Traversable<U>> {}

    // правильная типизация
    traverse<U>(
        of: <V>(val: V) => Applicative<V>,
        fn: (val: T) => Applicative<U>,
    ): Applicative<Maybe<U>> {}
}
```
