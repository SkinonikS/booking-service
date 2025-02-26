declare module 'nuxt/schema' {
  interface RuntimeConfig {
    oidc_storage: {
      redis: {
        host?: string;
        port?: number;
        password?: string;
        db?: number;
      };
    };
  }

  interface AppConfigInput {
    appName: string;
  }
}

export { };
