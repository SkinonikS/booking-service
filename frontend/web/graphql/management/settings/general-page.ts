export const GET_BOOKING_PROVIDER = /* GraphQL */ `
  query Management_GetBookingProvider($id: ID!) {
    bookingProvider(id: $id) {
      id
      name
      email
      phone
      website
      address
      aboutUs
      isActive
      coverImage {
        id
        fullUrl
        baseName
      }
      galleryImages {
        id
        fullUrl
        baseName
      }
    }
  }
`;

export const UPDATE_BOOKING_PROVIDER = /* GraphQL */ `
  mutation Management_UpdateBookingProvider($id: ID!, $name: String!, $email: String!, $phone: String!, $website: String, $address: String!, $aboutUs: String!, $isActive: Boolean!) {
    updateBookingProvider(id: $id, input: {
      name: $name,
      email: $email,
      phone: $phone,
      website: $website,
      address: $address,
      aboutUs: $aboutUs,
      isActive: $isActive
    }) {
      id
      name
      email
      phone
      website
      address
      aboutUs
      isActive
    }
  }
`;

export const DELETE_COVER_IMAGE = /* GraphQL */ `
  mutation Management_DeleteBookingProviderCoverImage($id: ID!, $bookingProviderId: ID!) {
    deleteBookingProviderCoverImage(id: $id, bookingProviderId: $bookingProviderId) {
      id
    }
  }
`;


export const DELETE_GALLERY_IMAGE = /* GraphQL */ `
  mutation Management_DeleteBookingProviderGalleryImage($id: ID!, $bookingProviderId: ID!) {
    deleteBookingProviderGalleryImage(id: $id, bookingProviderId: $bookingProviderId) {
      id
    }
  }
`;
