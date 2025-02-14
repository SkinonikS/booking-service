import { useBreakpoints } from '@vueuse/core';
import { theme } from '#tailwind-config';

export const useAppBreakponits = () => useBreakpoints(theme.screens);
