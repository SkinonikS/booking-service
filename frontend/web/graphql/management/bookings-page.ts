export const GET_BOOKINGS = /* GraphQL */ `
  query Management_GetBookings($id: ID!) {
    bookings(bookingProviderId: $id) {
      id
      date
      timeSlot
      serviceSchedule {
        service {
          id
          name
        }
      }
      user {
        id
        name
        email
      }
      cancelledAt
      cancellationReason
    }
  }
`;

export const CANCEL_BOOKING =  /* GraphQL */ `
  mutation Management_CancelBooking($id: ID!, $cancellationReason: String!) {
    cancelBooking(id: $id, input: { cancellationReason: $cancellationReason }) {
      id
      cancelledAt
      cancellationReason
    }
  }
`;
