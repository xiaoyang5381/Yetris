declare namespace ArrayType {
    export type Flat<Arr extends Array<any>, Depth extends number | void = void> = Depth extends number ? (Depth extends 1 ? FlatOne<Arr> : (IsSafeDepth<Depth> extends true ? FlatWithDepth<Arr, Depth> : FlatAll<Arr>)) : FlatAll<Arr>;
    export type Of<T, Depth extends number = 1> = IsSafeDepth<Depth> extends true ? PackWithDepth<T, Depth> : never;
    type PackWithDepth<T, Depth extends number> = Depth extends 0 ? T : PackWithDepth<Array<T>, Depths[Depth]>;
    type FlatOne<Arr extends Array<any>> = Arr extends [] ? [] : If<Not<IsNever<Arr>>, If<Not<LessThanEqual<Arr, []>>, Arr extends Array<infer Item> ? Item : Arr, [
    ]>, never>;
    type FlatWithDepth<Arr extends Array<any>, Depth extends number> = Depth extends 0 ? Arr[] : FlatWithDepth<FlatOne<Arr>, Depths[Depth]>;
    type FlatAll<Arr extends Array<any>> = Arr extends [] ? [] : If<Not<IsNever<Arr>>, If<Not<LessThanEqual<Arr, []>>, Arr extends Array<any> ? FlatAll<FlatOne<Arr>> : Arr[], If<IsAny<Arr>, any[], []>>, never>;
    export type IsSafeDepth<Depth extends number> = Depths[Depth] extends undefined ? false : true;
    type Depths = [-1, ...Sizes];
    type Sizes = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ];
    export {};
}
declare namespace Assert {
    type Type<K, Guard> = K extends Guard ? K : never;
    type NotType<K, Guard> = K extends Guard ? never : K;
    type String<K> = Type<K, string>;
    type Primitive<K> = Type<K, Primitives>;
}
declare type CodingError<T extends string, MSG extends string, V extends object = {}> = {
    message: MSG;
    type: T;
} & V;
declare type IsCodingError<T> = LessThanEqual<T, CodingError<string, string>>;
declare namespace FunctionType {
    type IsOverload<T extends (...args: any) => any> = If<IsFunction<T>, (T extends {
        (...args: infer P1): infer R1;
        (...args: infer P2): infer R2;
    } ? Or<NotEqual<P1, P2>, NotEqual<R1, R2>> : false), false>;

    type Unary<I,O> = (v:I)=>O;
}
declare type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
declare type IsNever<T> = T extends never ? true : false;
declare type IsBoolean<T> = Is<T, boolean>;
declare type IsTrue<T> = Is<T, true>;
declare type IsFalse<T> = Is<T, false>;
declare type IsNumber<T> = Is<T, number>;
declare type IsString<T> = Is<T, string>;
declare type IsFunction<T> = Is<T, (...args: any) => any>;
declare type Is<L, R> = If<And<Not<IsAny<L>>, Not<IsAny<R>>>, If<IsNever<L>, Equal<L, R>, false>, false>;
declare namespace RecordType {
    type ToIntersection<M extends Record<string, any>> = Union.ToIntersection<ToUnion<M>>;
    type LowercaseKey<M extends Record<string, any>> = {
        [K in keyof M as Lowercase<Assert.String<K>>]: M[K] extends Record<string, any> ? LowercaseKey<M[K]> : M[K];
    };
    type UppercaseKey<M extends Record<string, any>> = {
        [K in keyof M as Uppercase<Assert.String<K>>]: M[K] extends Record<string, any> ? UppercaseKey<M[K]> : M[K];
    };
    type PickInUnion<Field extends string, Union extends Record<Field, any>, K extends Union[Field]> = Extract<Union, Record<Field, K>>;
    type ToUnion<M extends Record<string, any>> = M[keyof M];
    type DeepReadonly<T> = T extends object ? T extends ((...args: any[]) => any) ? T : {
        readonly [K in keyof T]: DeepReadonly<T[K]>;
    } : T;
}
interface Constructor<T = object> {
    new (...args: any[]): T;
}
declare type Primitives = boolean | number | string | void | undefined | null | void;
declare type Prefix<K extends string, Pre extends string = '', Sep extends string = '/'> = '' extends Pre ? K : `${Pre}${Sep}${K}`;
declare type Test<R extends Record<string, boolean>> = {
    [K in keyof R]: boolean extends R[K] ? "Unknown" : R[K] extends true ? "True" : "False";
};
declare type TestStringRecord<R extends Record<string, boolean>> = Tuple.Join<Assert.Type<Union.ToTuple<TestRecordToUnion<R>>, string[]>, '{', '}', ','>;
declare type TestRecordToUnion<R extends Record<string, boolean>> = {
    [K in keyof R]: `${Assert.String<K>}:${R[K]}`;
}[keyof R];
declare namespace Tuple {
    export type Of<T, Size extends number = 1> = number extends Size ? T[] : (IsSafeSize<Size> extends true ? OfSize<T, Size> : Array<T>);
    export type Flat<Tup extends Array<any>, Depth extends number = 1> = ArrayType.IsSafeDepth<Depth> extends true ? FlatWithDepth<Tup, Depth> : never;
    export type IsSafeSize<Size extends number> = Sizes[Size] extends undefined ? false : true;
    export type Head<T extends Array<any>> = T extends [infer Head, ...infer Rest] ? Head : never;
    export type Rest<T extends Array<any>> = T extends [infer Head, ...infer Rest] ? Rest : never;
    type FlatWithDepth<Tuple extends Array<any>, Depth extends number> = {
        recur: FlatWithDepth<FlatTuple<Tuple>, Depths[Depth]>;
        res: Tuple;
    }[Depth extends 0 ? "res" : "recur"];
    type FlatTuple<Tuple extends Array<any>> = FlatWithRest<[], Tuple>;
    type FlatWithRest<Pre extends Array<any>, Rest extends Array<any>> = Rest['length'] extends 1 ? [
        ...Pre,
        ...HeadOfRestToFlat<Rest>
    ] : FlatWithRest<[...Pre, ...HeadOfRestToFlat<Rest>], RestOfRestToFlat<Rest>>;
    type HeadOfRestToFlat<Rest extends Array<any>> = Rest extends [infer Head, ...infer RestRest] ? (Head extends Array<any> ? Head : [Head]) : [];
    type RestOfRestToFlat<Rest extends Array<any>> = Rest extends [infer Head, ...infer RestRest] ? RestRest : [
    ];
    type Depths = [-1, ...Sizes];
    type Sizes = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31
    ];
    export type KeyOf<T extends any[]> = Exclude<keyof T, keyof []>;
    export type ToRecord<T extends any[]> = {
        [K in KeyOf<T>]: T[K];
    };
    export type Matrix<T, Row extends number, Col extends number> = Of<Of<T, Col>, Row>;
    type OfSize<T, N extends number> = N extends 1 ? [
        T
    ] : TupleOf<[T], N>;
    type TupleOf<T extends Array<any>, N extends number> = T['length'] extends N ? T : TupleOf<[ArrayType.Flat<T, 1>, ...T], N>;
    export type ToUnion<T extends any[]> = T extends Array<infer U> ? U : never;
    export type Concat<A extends any[], B extends any[]> = [...A, ...B];
    /**
     * Join tuple of serializable primitives to string
     */
    export type Join<T extends string[], Prefix extends string = '', Suffix extends string = '', Sep extends string = ''> = Rest<T> extends [] ? `${Prefix}${Assert.String<Head<T>>}${Suffix}` : Join<Assert.Type<Rest<T>, string[]>, `${Prefix}${Assert.String<Head<T>>}${Sep}`, Suffix, Sep>;
    export type toJSON<T extends string[]> = Join<T, '[', ']', ','>;
    export {};
}
declare type LessThanEqual<L, R> = If<Or<IsAny<L>, IsAny<R>>, true, L extends R ? true : false>;
declare type Equal<L, R> = And<LessThanEqual<L, R>, LessThanEqual<R, L>>;
declare type Or<L extends boolean, R extends boolean> = L extends true ? true : R extends true ? true : false;
declare type And<L extends boolean, R extends boolean> = L extends true ? R extends true ? true : false : false;
declare type Not<L extends boolean> = L extends true ? false : true;
declare type NotEqual<L, R> = Not<And<LessThanEqual<L, R>, LessThanEqual<R, L>>>;
declare type If<C extends boolean, L, R> = C extends true ? L : R;
declare namespace Union {
    export type ToTuple<U, T extends any[] = []> = Exclude<U, PickOneInUnion<U>> extends never ? [
        PickOneInUnion<U>,
        ...T
    ] : ToTuple<Exclude<U, PickOneInUnion<U>>, [PickOneInUnion<U>, ...T]>;
    type PickOneInUnion<U> = UnionToOverloadFunction<U> extends (k: infer I) => void ? I : never;
    type UnionToOverloadFunction<U> = (U extends any ? (k: (x: U) => void) => void : never) extends ((k: infer I) => void) ? I : never;
    export type ToRecordByField<Field extends string, Union extends Record<Field, any>> = {
        [K in Union[Field]]: Extract<Union, Record<Field, K>>;
    };
    export type ToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
    export {};
}

type ExistGuard<T> = (v: T | undefined | null) => v is T;