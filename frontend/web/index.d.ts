declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    graphql: {
      apiUrl: string;
    };
    fileUpload: {
      baseUrl: string;
    };
  }

  interface AppConfigInput {
    appName: string;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string, ...args: unknown[]) => string;
  }
}

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
