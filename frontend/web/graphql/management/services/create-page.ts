export const CREATE_SERVICE = /* GraphQL */ `
  mutation Management_CreateService($bookingProviderId: ID!, $name: String!, $description: String) {
    createService(input: { name: $name, description: $description, bookingProviderId: $bookingProviderId }) {
      id
    }
  }
`;
