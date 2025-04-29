
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost/graphql',
  documents: 'graphql/**/*.ts',
  generates: {
    'utils/graphql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        wrapEntireFieldDefinitions: true,
        entireFieldWrapperValue: 'T extends Array<infer U> ? Array<NonNullable<U>> : T',
      },
      plugins: [],
    },
  },
};

export default config;
