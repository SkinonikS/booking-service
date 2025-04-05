import { DateTime } from 'luxon';

export default definePayloadPlugin(() => {
  definePayloadReducer('DateTime', (value) => {
    return value instanceof DateTime && value.toJSON();
  });

  definePayloadReviver('DateTime', (value) => {
    return DateTime.fromISO(value);
  });
});
