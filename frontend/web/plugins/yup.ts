import * as yup from 'yup';

export default defineNuxtPlugin(() => {
  yup.addMethod(yup.number, 'timeBounded', function bounded(min: number, max: number) {
    const minTime = convertMinutesForHumans(min);
    const maxTime = convertMinutesForHumans(max);

    return this.test({
      name: 'time-in-boundaries',
      test: (value) => {
        if (! value) {
          return true;
        }

        return value >= min && value <= max;
      },
      message: ({ label }) => `${label} must be between ${minTime} and ${maxTime}`,
    });
  });
});

