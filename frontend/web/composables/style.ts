import { breakpointsTailwind } from '@vueuse/core';

export const useAppBreakpoints = () => useBreakpoints(breakpointsTailwind, {
  ssrWidth: 768,
});
