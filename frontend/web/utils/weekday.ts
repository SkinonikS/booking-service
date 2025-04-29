export const getWeekdayNameById = (id: number): string => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (id < 0 || id > 6) {
    throw new Error('Invalid weekday ID. Must be between 0 and 6.');
  }

  return weekdays[id];
};
