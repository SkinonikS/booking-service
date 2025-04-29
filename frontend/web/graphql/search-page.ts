export const GET_FILTER_DATA = /* GraphQL */ `
  query GetAsideFilterData {
    categories {
      id
      name
    }
  }
`;

export const GET_BOOKING_PROVIDERS = /* GraphQL */ `
  query GetBookingProviders($categories: [ID!], $date: Date, $address: String, $page: Int, $first: Int) {
    bookingProviders(categories: $categories, date: $date, address: $address, page: $page, first: $first) {
      data {
        id
        name
        address
        category {
          name
        }
        coverImage {
          fullUrl
        }
        weekdaySchedules {
          weekday
          openTime
          closeTime
        }
      }
      paginatorInfo {
        perPage
        total
        currentPage
      }
    }
  }
`;
