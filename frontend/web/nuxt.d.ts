declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    graphql: {
      baseUrl: string;
    };
    media: {
      baseUrl: string;
    };
  }

  interface AppConfigInput {
    appName: string;
  }
}

export { };
