export default defineI18nLocale(async () => {
  return {
    actions: {
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      reset: 'Reset',
      filter: 'Filter',
      resetFilter: 'Reset filter',
      goHome: 'Go home',
      goBack: 'Go back',
      search: 'Search',
      addNew: 'Add new',
      upload: 'Upload',
      cancel: 'Cancel',
      requestBooking: 'Request booking',
      cancelBooking: 'Cancel booking',
      addService: 'Add service',
      addServiceSchedule: 'Add service schedule',
      login: 'Login',
      logout: 'Logout',
    },
    labels: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      website: 'Website',
      date: 'Date',
      time: 'Time',
      description: 'Description',
      category: 'Category',
      categories: 'Categories',
      status: 'Status',
      weekday: 'Weekday',
      timeSlot: 'Time slot',
      openTime: 'Open time',
      closeTime: 'Close time',
      timeSpan: 'Time span',
      maxBookings: 'Max bookings',
      enabled: 'Enabled',
      service: 'Service',
      schedule: 'Schedule',
      aboutUs: 'About us',
      profile: 'Profile',
      bookingProvider: 'Booking provider',
    },
    statuses: {
      active: 'Active',
      inactive: 'Inactive',
      closed: 'Closed',
      past: 'Past',
      upcoming: 'Upcoming',
      cancelled: 'Cancelled',
    },
    images: {
      placeholders: {
        noImage: 'No image available',
      },
    },
    navigation: {
      mainMenu: {
        homepage: 'Home',
        search: 'Search',
        management: 'Management',
        bookings: 'My bookings',
        logout: 'Logout',
        login: 'Login',
      },
      managementMenu: {
        bookings: 'Bookings',
        services: 'Services',
        weekdaySchedules: 'Weekday Schedule',
        general: 'General Information',
      },
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
    errors: {
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
    public: {
      homepage: {
        title: 'Find and Book Amazing Experiences',
        description: 'Explore our features and services.',
        categories: 'Categories',
        bookingProviders: 'Booking providers',
      },
      search: {
        title: 'Advanced Search',
        description: 'Find booking providers by category, service, or location',
        filterTitle: 'Filter',
        filterDescription: 'Filter your search results by categories, services, and more.',
        noResults: {
          title: 'No results found',
          description1: 'We couldn\'t find any results matching your search.',
          description2: 'Try adjusting your search filters or categories.',
        },
      },
      bookingProvider: {
        contacts: {
          title: 'Contacts',
          description: 'Have questions? You contact booking provider using the following contacts:',
        },
        booking: {
          title: 'Request booking',
          description: 'Fill in the form below to request a booking.',
        },
        services: {
          title: 'Available Services',
        },
        about: {
          title: 'About Provider',
        },
      },
      userBookings: {
        title: 'My bookings',
        description: 'Manage your bookings and reservations.',
        tabs: {
          upcoming: 'Upcoming',
          past: 'Past',
          cancelled: 'Cancelled',
        },
        noResults: {
          title: 'No bookings found',
        },
      },
    },
    management: {
      bookingProviders: {
        noResults: {
          title: 'No bookings found',
        },
      },
      bookings: {
        title: 'Bookings',
        description: 'Manage your bookings and reservations.',
        noResults: {
          title: 'No bookings found',
        },
      },
      services: {
        title: 'Services',
        description: 'Manage your services and offerings.',
        noResults: {
          title: 'No bookings found',
        },
        create: {
          title: 'Create service',
          description: 'Fill in the form below to create a new service.',
        },
        edit: {
          title: 'Edit service',
          description: 'Update the details of your service.',
        },
      },
      schedules: {
        weekday: {
          title: 'Weekly Schedule Pattern',
          description: 'Set your regular weekly availability pattern.',
          edit: {
            title: 'Edit weekly schedule',
            description: 'Update the details of your weekly schedule.',
          },
        },
        services: {
          title: 'Service schedules',
          description: 'Manage service schedules.',
          create: {
            title: 'Create service schedule',
            description: 'Fill in the form below to create a new service schedule.',
          },
          edit: {
            title: 'Edit service schedule',
            description: 'Update the details of your service schedule.',
          },
          noResults: {
            title: 'No services found.',
          },
        },
      },
      settings: {
        general: {
          title: 'General settings',
          description: 'Update your business details and contact information.',
          sections: {
            basics: {
              title: 'Basic Information',
            },
            contacts: {
              title: 'Contact Information',
            },
            location: {
              title: 'Location',
            },
          },
        },
        media: {
          coverImage: {
            title: 'Cover image',
            description: 'This image will be displayed as the cover image.',
            noResults: {
              title: 'No cover image available',
              description: 'You can upload a new cover image.',
            },
          },
          gallery: {
            title: 'Gallery images',
            description: 'Manage your gallery images.',
            noResults: {
              title: 'No gallery images available',
              description: 'You can upload new gallery images.',
            },
          },
        },
      },
    },
  };
});
