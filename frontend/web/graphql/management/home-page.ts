export const GET_BOOKING_PROVIDERS = /* GraphQL */ `
  query Management_GetBookingProviders {
    me {
      bookingProviders {
        id
        name
        email
        phone
      }
    }
  }
`;
