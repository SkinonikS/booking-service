export const GET_WEEKDAYS_SCHEDULES = /* GraphQL */ `
  query Management_GetWeekdaySchedules($bookingProviderId: ID!) {
    bookingProvider(id: $bookingProviderId) {
      weekdaySchedules {
        id
        weekday
        openTime
        closeTime
        isActive
      }
    }
  }
`;
