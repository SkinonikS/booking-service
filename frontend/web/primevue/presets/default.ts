import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

export default definePreset(Aura, {
  components: {
    dataview: {
      border: {
        radius: '0.25rem',
        width: '1px',
      },
      colorScheme: {
        light: {
          border: {
            color: 'var(--p-surface-200)',
          },
          content: {
            color: '#000',
          },
        },
        dark: {
          border: {
            color: 'var(--p-surface-700)',
          },
          content: {
            color: '#fff',
          },
        },
      },
    },
    button: {
      colorScheme: {
        dark: {
          primary: {
            color: '#fff',
          },
        },
      },
    },
  },
  semantic: {
    primary: {
      50: '#f7f6fb',
      100: '#d9d2ed',
      200: '#baaede',
      300: '#9c8acf',
      400: '#7d67c1',
      500: '#5f43b2',
      600: '#513997',
      700: '#432f7d',
      800: '#342562',
      900: '#261b47',
      950: '#18112d',
    },
  },
});
