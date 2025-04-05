declare module 'yup' {
  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    timeBounded(min: number, max: number): NumberSchema<TType, TContext, TOut>;
  }
}

export { };
