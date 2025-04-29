export const GET_SERVICE_SCHEDULE = /* GraphQL */ `
  query Management_GetServiceSchedule($id: ID!) {
    serviceSchedule(id: $id) {
      id
      isActive
      openTime
      closeTime
      maxBookings
      timeSpan
      service {
        name
      }
    }
  }
`;

export const DELETE_SERVICE_SCHEDULE = /* GraphQL */ `
  mutation Management_DeleteServiceSchedule($id: ID!) {
    deleteServiceSchedule(id: $id) {
      id
    }
  }
`;

export const UPDATE_SERVICE_SCHEDULE = /* GraphQL */ `
  mutation Management_UpdateServiceSchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {
    updateServiceSchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime, maxBookings: $maxBookings, timeSpan: $timeSpan }) {
      id
      isActive
      openTime
      closeTime
      maxBookings
      timeSpan
    }
  }
`;
