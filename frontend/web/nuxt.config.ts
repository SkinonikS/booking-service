import Default from './primevue/presets/default';
import tailwindcss from '@tailwindcss/vite';

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
  ],

  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  nitro: {
    preset: 'node-server',
    storage: {
      oidc: {
        driver: 'fs',
        base: 'oidcstorage',
      },
    },
  },

  oidc: {
    middleware: {
      globalMiddlewareEnabled: false,
    },
    // session: {
    //   expirationCheck: false,
    // },
    providers: {
      cognito: {
        clientId: '',
        clientSecret: '',
        redirectUri: 'http://localhost:3000/auth/cognito/callback',
        scope: ['openid', 'email', 'profile'],
        logoutRedirectUri: 'http://localhost:3000/',
        baseUrl: '',
        prompt: ['consent login select_account'],
        responseMode: 'query',
        exposeIdToken: true,
        exposeAccessToken: true,
      },
    },
  },

  tailwindcss: {
    exposeConfig: true,
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ['https://placehold.co/', 'https://cdn.dummyjson.com', 'self'], // TODO: temporary
      },
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
