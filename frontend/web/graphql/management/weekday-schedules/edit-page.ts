export const GET_WEEKDAY_SCHEDULE = /* GraphQL */ `
  query Management_GetWeekdaySchedule($id: ID!) {
    weekdaySchedule(id: $id) {
      id
      weekday
      isActive
      openTime
      closeTime
    }
  }
`;

export const UPDATE_WEEKDAY_SCHEDULE =  /* GraphQL */ `
  mutation Management_UpdateWeekdaySchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!) {
    updateWeekdaySchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime }) {
      id
      weekday
      isActive
      openTime
      closeTime
    }
  }
`;

export const GET_SERVICE_SCHEDULES = /* GraphQL */ `
  query Management_GetServiceSchedules($id: ID!) {
    weekdaySchedule(id: $id) {
      serviceSchedules {
        id
        openTime
        closeTime
        isActive
        service {
          name
        }
      }
    }
  }
`;
