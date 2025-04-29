export const GET_WEEKDAY_SCHEDULE = /* GraphQL */ `
  query Management_EditWeekdaySchedule($id: ID!) {
    weekdaySchedule(id: $id) {
      openTime
      closeTime
      bookingProvider {
        services {
          id
          name
        }
      }
    }
   }
`;

export const CREATE_SERVICE_SCHEDULE = /* GraphQL */ `
  mutation Management_CreateServiceSchedule($weekdayScheduleId: ID!, $serviceId: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {
    createServiceSchedule(input: {
      weekdayScheduleId: $weekdayScheduleId,
      serviceId: $serviceId,
      isActive: $isActive,
      openTime: $openTime,
      closeTime: $closeTime,
      maxBookings: $maxBookings,
      timeSpan: $timeSpan
    }) {
      id
    }
  }
`;
