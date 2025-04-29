export const GET_SERVICE = /* GraphQL */ `
  query Management_GetService($serviceId: ID!) {
    service(id: $serviceId) {
      id
      name
      description
    }
  }
`;

export const UPDATE_SERVICE = /* GraphQL */ `
  mutation Management_UpdateService($id: ID!, $name: String!, $description: String) {
    updateService(id: $id, input: { name: $name, description: $description }) {
      id
    }
  }
`;

export const DELETE_SERVICE =/* GraphQL */ `
  mutation deleteService($id: ID!) {
    deleteService(id: $id) {
      id
    }
  }
`;
