import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
// @ts-expect-error Tailwindcss PrimeUI is not typed
import PrimeUI from 'tailwindcss-primeui';

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: [
          ['Inter'].concat(defaultTheme.fontFamily.sans),
          {
            fontFeatureSettings: '"cv02","cv03","cv04","cv11"',
          },
        ],
      },
    },
  },
  plugins: [
    PrimeUI,
  ],
};
