export const GET_SERVICES = /* GraphQL */ `
  query Management_GetServices($id: ID!) {
    bookingProvider(id: $id) {
      id
      services {
        id
        name
        description
      }
    }
  }
`;
