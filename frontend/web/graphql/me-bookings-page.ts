export const GET_MY_BOOKINGS = /* GraphQL */ `
  query GetMyBookings {
    me {
      id
      bookings {
        id
        cancelledAt
        cancellationReason
        date
        timeSlot
        serviceSchedule {
          id
          weekdaySchedule {
            bookingProvider {
              id
              name
            }
          }
          service {
            id
            name
          }
        }
      }
    }
  }
`;

export const CANCEL_BOOKING = /* GraphQL */ `
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(id: $bookingId, input: { cancellationReason: "User cancelled" }) {
      id
      cancelledAt
      cancellationReason
    }
  }
`;
