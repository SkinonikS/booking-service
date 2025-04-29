export const convertMinutesForHumans = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const getFormattedTimeRange = (openTime: number, closeTime: number, delimiter: string = ' - ') => {
  return `${convertMinutesForHumans(openTime)}${delimiter}${convertMinutesForHumans(closeTime)}`;
};
