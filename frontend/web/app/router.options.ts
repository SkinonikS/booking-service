import type { RouterConfig } from '@nuxt/schema';
import { parse, stringify } from 'qs';
import type { LocationQuery } from 'vue-router';

export default {
  parseQuery: (query) => parse(query, {
    arrayLimit: 100,
    comma: true,
    parameterLimit: 100,
    duplicates: 'combine',
  }) as LocationQuery,
  stringifyQuery: (query) => stringify(query, {
    skipNulls: true,
    allowEmptyArrays: false,
    arrayFormat: 'comma',
    commaRoundTrip: true,
  }),
} satisfies RouterConfig;
