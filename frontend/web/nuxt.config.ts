import tailwindcss from '@tailwindcss/vite';
import Default from './primevue/presets/default';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@primevue/nuxt-module',
    'v-wave/nuxt',
    '@vueuse/nuxt',
    'nuxt-security',
    'nuxt-oidc-auth',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    'nuxt-graphql-request',
    '@vite-pwa/nuxt',
  ],

  app: {
    head: {
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
      ],
    },
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    registerWebManifestInRouteRules: true,
    manifest: {
      name: 'YourNameHere',
      short_name: 'YourNameHere',
      description: 'YourNameHere description',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    lazy: true,
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.ts',
      },
      {
        code: 'ru',
        name: 'Русский',
        file: 'ru.ts',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
    experimental: {
      localeDetector: 'localeDetector.ts',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  nitro: {
    storage: {
      oidc: {
        driver: 'fs',
        base: './.cache/oidc',
      },
    },
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  oidc: {
    middleware: {
      globalMiddlewareEnabled: false,
    },
    providers: {
      cognito: {
        clientId: process.env.NUXT_OIDC_PROVIDERS_COGNITO_CLIENT_ID || '',
        clientSecret: process.env.NUXT_OIDC_PROVIDERS_COGNITO_CLIENT_SECRET || '',
        redirectUri: process.env.NUXT_OIDC_PROVIDERS_COGNITO_REDIRECT_URI || '',
        scope: ['openid', 'email', 'profile'],
        logoutRedirectUri: process.env.NUXT_OIDC_PROVIDERS_COGNITO_LOGOUT_REDIRECT_URI || '',
        baseUrl: process.env.NUXT_OIDC_PROVIDERS_COGNITO_BASE_URL || '',
      },
    },
    provideDefaultSecrets: false,
  },

  graphql: {
    clients: {
      default: {
        endpoint: 'http://localhost/graphql',
      },
    },
  },

  security: {
    headers: {
      contentSecurityPolicy: false,
    },
    csrf: {
      enabled: true,
      addCsrfTokenToEventCtx: true,
      cookieKey: 'CSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN',
      cookie: {
        sameSite: 'lax',
      },
    },
  },

  runtimeConfig: {
    public: {
      graphql: {
        baseUrl: '',
      },
      media: {
        baseUrl: '',
      },
    },
  },

  watch: [
    'primevue/presets/default.ts',
  ],

  icon: {
    mode: 'svg',
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/scss/main.scss',
  ],

  primevue: {
    options: {
      theme: {
        preset: Default,
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'theme, base, primevue',
          },
        },
      },
    },
  },
});
