export default defineI18nLocale(async () => {
  return {
    layouts: {
      default: {
        navigation: {
          homepage: 'Home',
          advancedSearch: 'Search',
          management: 'Management',
        },
      },
    },

    pages: {
      homepage: {
        title: 'Find and Book Amazing Experiences',
        description: 'Explore our features and services.',
      },
      search: {
        noResultsFound: {
          title: 'No results found',
          description1: 'We couldn\'t find any results matching your search.',
          description2: 'Try adjusting your search filters or categories.',
        },
      },
      bookingProvidersShow: {
        contactsTitle: 'Contacts',
        contactsDescription: 'Have questions? You contact booking provider using the following contacts:',
        requestBookingTitle: 'Request booking',
        requestBookingDescription: 'Fill in the form below to request a booking.',
      },
      meBookings: {
        title: 'My bookings',
        description: 'Manage your bookings and reservations.',
      },
    },

    management: {
      pages: {
        bookings: {
          title: 'Bookings',
          description: 'Manage your bookings and reservations.',
        },
        settingsGeneral: {
          title: 'General settings',
          description: 'Update your business details and contact information.',
        },
        settingsGeneralGalleyImages: {
          title: 'Gallery images',
          description: 'Manage your gallery images.',
          noCoverImage: 'No gallery images available',
          clickToUpload: 'Click to upload a new gallery image',
        },
        settingsGeneralCoverImage: {
          title: 'Cover image',
          description: 'This image will be displayed as the cover image.',
          noCoverImage: 'No cover image available',
          clickToUpload: 'Click to upload a new cover image',
        },
        services: {
          title: 'Services',
          description: 'Manage your services and offerings.',
        },
        servicesCreate: {
          title: 'Create service',
          description: 'Fill in the form below to create a new service.',
        },
        servicesEdit: {
          title: 'Edit service',
          description: 'Update the details of your service.',
        },
        weekdaySchedules: {
          title: 'Weekly Schedule Pattern',
          description: 'Set your regular weekly availability pattern.',
        },
        weekdaySchedulesEdit: {
          title: 'Edit weekly schedule',
          description: 'Update the details of your weekly schedule.',
        },
        weekdaySchedulesServices: {
          title: 'Service schedules',
          description: 'Manage service schedules.',
        },
        serviceSchedultCreate: {
          title: 'Create service schedule',
          description: 'Fill in the form below to create a new service schedule.',
        },
        serviceSchedultEdit: {
          title: 'Edit service schedule',
          description: 'Update the details of your service schedule.',
        },
      },
    },

    common: {
      categories: 'Categories',
      search: 'Search',
      category: 'Category',
      bookingProviders: 'Booking providers',
      addServiceSchedule: 'Add service schedule',
      delete: 'Delete',
      addService: 'Add service',
      description: 'Description',
      uploadCoverImage: 'Upload cover image',
      addGalleryImage: 'Add gallery image',
      cancelBooking: 'Cancel booking',
      noBookingsFound: 'No bookings found',
      edit: 'Edit',
      timeSlot: 'Time slot',
      schedule: 'Schedule',
      service: 'Service',
      requestBooking: 'Request booking',
      weekday: 'Weekday',
      status: 'Status',
      openTime: 'Open time',
      closeTime: 'Close time',
      email: 'Email',
      phone: 'Phone',
      date: 'Date',
      time: 'Time',
      name: 'Name',
      view: 'View',
      aboutUs: 'About us',
      noImageAvailable: 'No image available',
      homepage: 'Homepage',
      advancedSearch: 'Advanced search',
      profile: 'Profile',
      bookings: 'My bookings',
      logout: 'Logout',
      login: 'Login',
      active: 'Active',
      inactive: 'Inactive',
      closed: 'Closed',
      goHome: 'Go home',
      goBack: 'Go back',
      resetFilter: 'Reset filter',
      save: 'Save',
      noServicesFound: 'No services found',
      maxBookings: 'Max bookings',
      timeSpan: 'Time span',
      enabled: 'Enabled',
      past: 'Past',
      upcoming: 'Upcoming',
      cancelled: 'Cancelled',
      bookingProvider: 'Booking provider',
      website: 'Website',
      address: 'Address',
      reset: 'Reset',
    },

    weekdays: {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    },

    error: {
      404: {
        title: 'Page not found',
        description: 'Sorry, the page you are looking for does not exist.',
      },
      500: {
        title: 'An error occurred',
        description: 'An unexpected error occurred. Please try again later.',
      },
      401: {
        title: 'Unauthorized',
        description: 'Sorry, you are not authorized to access this page.',
      },
    },
  };
});
