export const GET_RANDOM_BOOKING_PROVIDERS = /* GraphQL */ `
  query GetRandomBookingProviders {
    randomBookingProviders(limit: 5) {
      id
      name
      address
      category {
        name
      }
      coverImage {
        fullUrl
      }
    }
  }
`;

export const GET_RANDOM_CATEGORIES = /* GraphQL */ `
  query GetRandomCategories {
    randomCategories(limit: 6) {
      id
      name
    }
  }
`;


export const GET_CATEGORIES = /* GraphQL */ `
  query GetCategories {
    categories {
      id
      name
    }
  }
`;
