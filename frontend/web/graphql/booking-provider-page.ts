export const GET_BOOKING_PROVIDER = /* GraphQL */ `
  query GetBookingProvider($id: ID!) {
    bookingProvider(id: $id) {
      id
      name
      email
      phone
      website
      address
      aboutUs
      isActive
      galleryImages {
        fullUrl
      }
      weekdaySchedules {
        weekday
        openTime
        closeTime
        isActive
      }
      services {
        id
        name
      }
    }
  }
`;

export const GET_DATEPICKER_INFO_FOR_SERVICE = /* GraphQL */ `
  query GetDatepickerInfoForService($serviceId: ID!, $date: Date!) {
    serviceDatepicker(serviceId: $serviceId, date: $date) {
      serviceSchedule {
        id
        openTime
        closeTime
        service {
          name
        }
        maxBookings
        timeSpan
      }
      bookedTimeSlots {
        timeSlot
        currentBookings
      }
    }
  }
`;

export const REQUEST_BOOKING = /* GraphQL */ `
  mutation RequestBooking($serviceScheduleId: ID!, $date: Date!, $timeSlot: Int!) {
    createBooking(input: { serviceScheduleId: $serviceScheduleId, date: $date, timeSlot: $timeSlot }) {
      id
    }
  }
`;
