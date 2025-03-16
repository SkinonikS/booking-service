declare module 'nuxt/schema' {
  interface RuntimeConfig {
    api: {
      baseUrl: string;
    };
  }

  interface AppConfigInput {
    appName: string;
  }
}

export { };
