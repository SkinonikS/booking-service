/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetBookingProvider($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n      galleryImages {\n        fullUrl\n      }\n      weekdaySchedules {\n        weekday\n        openTime\n        closeTime\n        isActive\n      }\n      services {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetBookingProviderDocument,
    "\n  query GetDatepickerInfoForService($serviceId: ID!, $date: Date!) {\n    serviceDatepicker(serviceId: $serviceId, date: $date) {\n      serviceSchedule {\n        id\n        openTime\n        closeTime\n        service {\n          name\n        }\n        maxBookings\n        timeSpan\n      }\n      bookedTimeSlots {\n        timeSlot\n        currentBookings\n      }\n    }\n  }\n": typeof types.GetDatepickerInfoForServiceDocument,
    "\n  mutation RequestBooking($serviceScheduleId: ID!, $date: Date!, $timeSlot: Int!) {\n    createBooking(input: { serviceScheduleId: $serviceScheduleId, date: $date, timeSlot: $timeSlot }) {\n      id\n    }\n  }\n": typeof types.RequestBookingDocument,
    "\n  query GetRandomBookingProviders {\n    randomBookingProviders(limit: 5) {\n      id\n      name\n      address\n      category {\n        name\n      }\n      coverImage {\n        fullUrl\n      }\n    }\n  }\n": typeof types.GetRandomBookingProvidersDocument,
    "\n  query GetRandomCategories {\n    randomCategories(limit: 6) {\n      id\n      name\n    }\n  }\n": typeof types.GetRandomCategoriesDocument,
    "\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n": typeof types.GetCategoriesDocument,
    "\n  query Management_GetBookings($id: ID!) {\n    bookings(bookingProviderId: $id) {\n      id\n      date\n      timeSlot\n      serviceSchedule {\n        service {\n          id\n          name\n        }\n      }\n      user {\n        id\n        name\n        email\n      }\n      cancelledAt\n      cancellationReason\n    }\n  }\n": typeof types.Management_GetBookingsDocument,
    "\n  mutation Management_CancelBooking($id: ID!, $cancellationReason: String!) {\n    cancelBooking(id: $id, input: { cancellationReason: $cancellationReason }) {\n      id\n      cancelledAt\n      cancellationReason\n    }\n  }\n": typeof types.Management_CancelBookingDocument,
    "\n  query Management_GetBookingProviders {\n    me {\n      bookingProviders {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n": typeof types.Management_GetBookingProvidersDocument,
    "\n  mutation Management_CreateService($bookingProviderId: ID!, $name: String!, $description: String) {\n    createService(input: { name: $name, description: $description, bookingProviderId: $bookingProviderId }) {\n      id\n    }\n  }\n": typeof types.Management_CreateServiceDocument,
    "\n  query Management_GetService($serviceId: ID!) {\n    service(id: $serviceId) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.Management_GetServiceDocument,
    "\n  mutation Management_UpdateService($id: ID!, $name: String!, $description: String) {\n    updateService(id: $id, input: { name: $name, description: $description }) {\n      id\n    }\n  }\n": typeof types.Management_UpdateServiceDocument,
    "\n  mutation deleteService($id: ID!) {\n    deleteService(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteServiceDocument,
    "\n  query Management_GetServices($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      services {\n        id\n        name\n        description\n      }\n    }\n  }\n": typeof types.Management_GetServicesDocument,
    "\n  query Management_GetBookingProvider($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n      coverImage {\n        id\n        fullUrl\n        baseName\n      }\n      galleryImages {\n        id\n        fullUrl\n        baseName\n      }\n    }\n  }\n": typeof types.Management_GetBookingProviderDocument,
    "\n  mutation Management_UpdateBookingProvider($id: ID!, $name: String!, $email: String!, $phone: String!, $website: String, $address: String!, $aboutUs: String!, $isActive: Boolean!) {\n    updateBookingProvider(id: $id, input: {\n      name: $name,\n      email: $email,\n      phone: $phone,\n      website: $website,\n      address: $address,\n      aboutUs: $aboutUs,\n      isActive: $isActive\n    }) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n    }\n  }\n": typeof types.Management_UpdateBookingProviderDocument,
    "\n  mutation Management_DeleteBookingProviderCoverImage($id: ID!, $bookingProviderId: ID!) {\n    deleteBookingProviderCoverImage(id: $id, bookingProviderId: $bookingProviderId) {\n      id\n    }\n  }\n": typeof types.Management_DeleteBookingProviderCoverImageDocument,
    "\n  mutation Management_DeleteBookingProviderGalleryImage($id: ID!, $bookingProviderId: ID!) {\n    deleteBookingProviderGalleryImage(id: $id, bookingProviderId: $bookingProviderId) {\n      id\n    }\n  }\n": typeof types.Management_DeleteBookingProviderGalleryImageDocument,
    "\n  query Management_GetWeekdaySchedule($id: ID!) {\n    weekdaySchedule(id: $id) {\n      id\n      weekday\n      isActive\n      openTime\n      closeTime\n    }\n  }\n": typeof types.Management_GetWeekdayScheduleDocument,
    "\n  mutation Management_UpdateWeekdaySchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!) {\n    updateWeekdaySchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime }) {\n      id\n      weekday\n      isActive\n      openTime\n      closeTime\n    }\n  }\n": typeof types.Management_UpdateWeekdayScheduleDocument,
    "\n  query Management_GetServiceSchedules($id: ID!) {\n    weekdaySchedule(id: $id) {\n      serviceSchedules {\n        id\n        openTime\n        closeTime\n        isActive\n        service {\n          name\n        }\n      }\n    }\n  }\n": typeof types.Management_GetServiceSchedulesDocument,
    "\n  query Management_GetWeekdaySchedules($bookingProviderId: ID!) {\n    bookingProvider(id: $bookingProviderId) {\n      weekdaySchedules {\n        id\n        weekday\n        openTime\n        closeTime\n        isActive\n      }\n    }\n  }\n": typeof types.Management_GetWeekdaySchedulesDocument,
    "\n  query Management_EditWeekdaySchedule($id: ID!) {\n    weekdaySchedule(id: $id) {\n      openTime\n      closeTime\n      bookingProvider {\n        services {\n          id\n          name\n        }\n      }\n    }\n   }\n": typeof types.Management_EditWeekdayScheduleDocument,
    "\n  mutation Management_CreateServiceSchedule($weekdayScheduleId: ID!, $serviceId: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {\n    createServiceSchedule(input: {\n      weekdayScheduleId: $weekdayScheduleId,\n      serviceId: $serviceId,\n      isActive: $isActive,\n      openTime: $openTime,\n      closeTime: $closeTime,\n      maxBookings: $maxBookings,\n      timeSpan: $timeSpan\n    }) {\n      id\n    }\n  }\n": typeof types.Management_CreateServiceScheduleDocument,
    "\n  query Management_GetServiceSchedule($id: ID!) {\n    serviceSchedule(id: $id) {\n      id\n      isActive\n      openTime\n      closeTime\n      maxBookings\n      timeSpan\n      service {\n        name\n      }\n    }\n  }\n": typeof types.Management_GetServiceScheduleDocument,
    "\n  mutation Management_DeleteServiceSchedule($id: ID!) {\n    deleteServiceSchedule(id: $id) {\n      id\n    }\n  }\n": typeof types.Management_DeleteServiceScheduleDocument,
    "\n  mutation Management_UpdateServiceSchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {\n    updateServiceSchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime, maxBookings: $maxBookings, timeSpan: $timeSpan }) {\n      id\n      isActive\n      openTime\n      closeTime\n      maxBookings\n      timeSpan\n    }\n  }\n": typeof types.Management_UpdateServiceScheduleDocument,
    "\n  query GetMyBookings {\n    me {\n      id\n      bookings {\n        id\n        cancelledAt\n        cancellationReason\n        date\n        timeSlot\n        serviceSchedule {\n          id\n          weekdaySchedule {\n            bookingProvider {\n              id\n              name\n            }\n          }\n          service {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetMyBookingsDocument,
    "\n  mutation CancelBooking($bookingId: ID!) {\n    cancelBooking(id: $bookingId, input: { cancellationReason: \"User cancelled\" }) {\n      id\n      cancelledAt\n      cancellationReason\n    }\n  }\n": typeof types.CancelBookingDocument,
    "\n  query GetAsideFilterData {\n    categories {\n      id\n      name\n    }\n  }\n": typeof types.GetAsideFilterDataDocument,
    "\n  query GetBookingProviders($categories: [ID!], $date: Date, $address: String, $page: Int, $first: Int) {\n    bookingProviders(categories: $categories, date: $date, address: $address, page: $page, first: $first) {\n      data {\n        id\n        name\n        address\n        category {\n          name\n        }\n        coverImage {\n          fullUrl\n        }\n        weekdaySchedules {\n          weekday\n          openTime\n          closeTime\n        }\n      }\n      paginatorInfo {\n        perPage\n        total\n        currentPage\n      }\n    }\n  }\n": typeof types.GetBookingProvidersDocument,
};
const documents: Documents = {
    "\n  query GetBookingProvider($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n      galleryImages {\n        fullUrl\n      }\n      weekdaySchedules {\n        weekday\n        openTime\n        closeTime\n        isActive\n      }\n      services {\n        id\n        name\n      }\n    }\n  }\n": types.GetBookingProviderDocument,
    "\n  query GetDatepickerInfoForService($serviceId: ID!, $date: Date!) {\n    serviceDatepicker(serviceId: $serviceId, date: $date) {\n      serviceSchedule {\n        id\n        openTime\n        closeTime\n        service {\n          name\n        }\n        maxBookings\n        timeSpan\n      }\n      bookedTimeSlots {\n        timeSlot\n        currentBookings\n      }\n    }\n  }\n": types.GetDatepickerInfoForServiceDocument,
    "\n  mutation RequestBooking($serviceScheduleId: ID!, $date: Date!, $timeSlot: Int!) {\n    createBooking(input: { serviceScheduleId: $serviceScheduleId, date: $date, timeSlot: $timeSlot }) {\n      id\n    }\n  }\n": types.RequestBookingDocument,
    "\n  query GetRandomBookingProviders {\n    randomBookingProviders(limit: 5) {\n      id\n      name\n      address\n      category {\n        name\n      }\n      coverImage {\n        fullUrl\n      }\n    }\n  }\n": types.GetRandomBookingProvidersDocument,
    "\n  query GetRandomCategories {\n    randomCategories(limit: 6) {\n      id\n      name\n    }\n  }\n": types.GetRandomCategoriesDocument,
    "\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query Management_GetBookings($id: ID!) {\n    bookings(bookingProviderId: $id) {\n      id\n      date\n      timeSlot\n      serviceSchedule {\n        service {\n          id\n          name\n        }\n      }\n      user {\n        id\n        name\n        email\n      }\n      cancelledAt\n      cancellationReason\n    }\n  }\n": types.Management_GetBookingsDocument,
    "\n  mutation Management_CancelBooking($id: ID!, $cancellationReason: String!) {\n    cancelBooking(id: $id, input: { cancellationReason: $cancellationReason }) {\n      id\n      cancelledAt\n      cancellationReason\n    }\n  }\n": types.Management_CancelBookingDocument,
    "\n  query Management_GetBookingProviders {\n    me {\n      bookingProviders {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n": types.Management_GetBookingProvidersDocument,
    "\n  mutation Management_CreateService($bookingProviderId: ID!, $name: String!, $description: String) {\n    createService(input: { name: $name, description: $description, bookingProviderId: $bookingProviderId }) {\n      id\n    }\n  }\n": types.Management_CreateServiceDocument,
    "\n  query Management_GetService($serviceId: ID!) {\n    service(id: $serviceId) {\n      id\n      name\n      description\n    }\n  }\n": types.Management_GetServiceDocument,
    "\n  mutation Management_UpdateService($id: ID!, $name: String!, $description: String) {\n    updateService(id: $id, input: { name: $name, description: $description }) {\n      id\n    }\n  }\n": types.Management_UpdateServiceDocument,
    "\n  mutation deleteService($id: ID!) {\n    deleteService(id: $id) {\n      id\n    }\n  }\n": types.DeleteServiceDocument,
    "\n  query Management_GetServices($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      services {\n        id\n        name\n        description\n      }\n    }\n  }\n": types.Management_GetServicesDocument,
    "\n  query Management_GetBookingProvider($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n      coverImage {\n        id\n        fullUrl\n        baseName\n      }\n      galleryImages {\n        id\n        fullUrl\n        baseName\n      }\n    }\n  }\n": types.Management_GetBookingProviderDocument,
    "\n  mutation Management_UpdateBookingProvider($id: ID!, $name: String!, $email: String!, $phone: String!, $website: String, $address: String!, $aboutUs: String!, $isActive: Boolean!) {\n    updateBookingProvider(id: $id, input: {\n      name: $name,\n      email: $email,\n      phone: $phone,\n      website: $website,\n      address: $address,\n      aboutUs: $aboutUs,\n      isActive: $isActive\n    }) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n    }\n  }\n": types.Management_UpdateBookingProviderDocument,
    "\n  mutation Management_DeleteBookingProviderCoverImage($id: ID!, $bookingProviderId: ID!) {\n    deleteBookingProviderCoverImage(id: $id, bookingProviderId: $bookingProviderId) {\n      id\n    }\n  }\n": types.Management_DeleteBookingProviderCoverImageDocument,
    "\n  mutation Management_DeleteBookingProviderGalleryImage($id: ID!, $bookingProviderId: ID!) {\n    deleteBookingProviderGalleryImage(id: $id, bookingProviderId: $bookingProviderId) {\n      id\n    }\n  }\n": types.Management_DeleteBookingProviderGalleryImageDocument,
    "\n  query Management_GetWeekdaySchedule($id: ID!) {\n    weekdaySchedule(id: $id) {\n      id\n      weekday\n      isActive\n      openTime\n      closeTime\n    }\n  }\n": types.Management_GetWeekdayScheduleDocument,
    "\n  mutation Management_UpdateWeekdaySchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!) {\n    updateWeekdaySchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime }) {\n      id\n      weekday\n      isActive\n      openTime\n      closeTime\n    }\n  }\n": types.Management_UpdateWeekdayScheduleDocument,
    "\n  query Management_GetServiceSchedules($id: ID!) {\n    weekdaySchedule(id: $id) {\n      serviceSchedules {\n        id\n        openTime\n        closeTime\n        isActive\n        service {\n          name\n        }\n      }\n    }\n  }\n": types.Management_GetServiceSchedulesDocument,
    "\n  query Management_GetWeekdaySchedules($bookingProviderId: ID!) {\n    bookingProvider(id: $bookingProviderId) {\n      weekdaySchedules {\n        id\n        weekday\n        openTime\n        closeTime\n        isActive\n      }\n    }\n  }\n": types.Management_GetWeekdaySchedulesDocument,
    "\n  query Management_EditWeekdaySchedule($id: ID!) {\n    weekdaySchedule(id: $id) {\n      openTime\n      closeTime\n      bookingProvider {\n        services {\n          id\n          name\n        }\n      }\n    }\n   }\n": types.Management_EditWeekdayScheduleDocument,
    "\n  mutation Management_CreateServiceSchedule($weekdayScheduleId: ID!, $serviceId: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {\n    createServiceSchedule(input: {\n      weekdayScheduleId: $weekdayScheduleId,\n      serviceId: $serviceId,\n      isActive: $isActive,\n      openTime: $openTime,\n      closeTime: $closeTime,\n      maxBookings: $maxBookings,\n      timeSpan: $timeSpan\n    }) {\n      id\n    }\n  }\n": types.Management_CreateServiceScheduleDocument,
    "\n  query Management_GetServiceSchedule($id: ID!) {\n    serviceSchedule(id: $id) {\n      id\n      isActive\n      openTime\n      closeTime\n      maxBookings\n      timeSpan\n      service {\n        name\n      }\n    }\n  }\n": types.Management_GetServiceScheduleDocument,
    "\n  mutation Management_DeleteServiceSchedule($id: ID!) {\n    deleteServiceSchedule(id: $id) {\n      id\n    }\n  }\n": types.Management_DeleteServiceScheduleDocument,
    "\n  mutation Management_UpdateServiceSchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {\n    updateServiceSchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime, maxBookings: $maxBookings, timeSpan: $timeSpan }) {\n      id\n      isActive\n      openTime\n      closeTime\n      maxBookings\n      timeSpan\n    }\n  }\n": types.Management_UpdateServiceScheduleDocument,
    "\n  query GetMyBookings {\n    me {\n      id\n      bookings {\n        id\n        cancelledAt\n        cancellationReason\n        date\n        timeSlot\n        serviceSchedule {\n          id\n          weekdaySchedule {\n            bookingProvider {\n              id\n              name\n            }\n          }\n          service {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetMyBookingsDocument,
    "\n  mutation CancelBooking($bookingId: ID!) {\n    cancelBooking(id: $bookingId, input: { cancellationReason: \"User cancelled\" }) {\n      id\n      cancelledAt\n      cancellationReason\n    }\n  }\n": types.CancelBookingDocument,
    "\n  query GetAsideFilterData {\n    categories {\n      id\n      name\n    }\n  }\n": types.GetAsideFilterDataDocument,
    "\n  query GetBookingProviders($categories: [ID!], $date: Date, $address: String, $page: Int, $first: Int) {\n    bookingProviders(categories: $categories, date: $date, address: $address, page: $page, first: $first) {\n      data {\n        id\n        name\n        address\n        category {\n          name\n        }\n        coverImage {\n          fullUrl\n        }\n        weekdaySchedules {\n          weekday\n          openTime\n          closeTime\n        }\n      }\n      paginatorInfo {\n        perPage\n        total\n        currentPage\n      }\n    }\n  }\n": types.GetBookingProvidersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookingProvider($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n      galleryImages {\n        fullUrl\n      }\n      weekdaySchedules {\n        weekday\n        openTime\n        closeTime\n        isActive\n      }\n      services {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBookingProvider($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n      galleryImages {\n        fullUrl\n      }\n      weekdaySchedules {\n        weekday\n        openTime\n        closeTime\n        isActive\n      }\n      services {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDatepickerInfoForService($serviceId: ID!, $date: Date!) {\n    serviceDatepicker(serviceId: $serviceId, date: $date) {\n      serviceSchedule {\n        id\n        openTime\n        closeTime\n        service {\n          name\n        }\n        maxBookings\n        timeSpan\n      }\n      bookedTimeSlots {\n        timeSlot\n        currentBookings\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDatepickerInfoForService($serviceId: ID!, $date: Date!) {\n    serviceDatepicker(serviceId: $serviceId, date: $date) {\n      serviceSchedule {\n        id\n        openTime\n        closeTime\n        service {\n          name\n        }\n        maxBookings\n        timeSpan\n      }\n      bookedTimeSlots {\n        timeSlot\n        currentBookings\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestBooking($serviceScheduleId: ID!, $date: Date!, $timeSlot: Int!) {\n    createBooking(input: { serviceScheduleId: $serviceScheduleId, date: $date, timeSlot: $timeSlot }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RequestBooking($serviceScheduleId: ID!, $date: Date!, $timeSlot: Int!) {\n    createBooking(input: { serviceScheduleId: $serviceScheduleId, date: $date, timeSlot: $timeSlot }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRandomBookingProviders {\n    randomBookingProviders(limit: 5) {\n      id\n      name\n      address\n      category {\n        name\n      }\n      coverImage {\n        fullUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRandomBookingProviders {\n    randomBookingProviders(limit: 5) {\n      id\n      name\n      address\n      category {\n        name\n      }\n      coverImage {\n        fullUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRandomCategories {\n    randomCategories(limit: 6) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetRandomCategories {\n    randomCategories(limit: 6) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Management_GetBookings($id: ID!) {\n    bookings(bookingProviderId: $id) {\n      id\n      date\n      timeSlot\n      serviceSchedule {\n        service {\n          id\n          name\n        }\n      }\n      user {\n        id\n        name\n        email\n      }\n      cancelledAt\n      cancellationReason\n    }\n  }\n"): (typeof documents)["\n  query Management_GetBookings($id: ID!) {\n    bookings(bookingProviderId: $id) {\n      id\n      date\n      timeSlot\n      serviceSchedule {\n        service {\n          id\n          name\n        }\n      }\n      user {\n        id\n        name\n        email\n      }\n      cancelledAt\n      cancellationReason\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Management_CancelBooking($id: ID!, $cancellationReason: String!) {\n    cancelBooking(id: $id, input: { cancellationReason: $cancellationReason }) {\n      id\n      cancelledAt\n      cancellationReason\n    }\n  }\n"): (typeof documents)["\n  mutation Management_CancelBooking($id: ID!, $cancellationReason: String!) {\n    cancelBooking(id: $id, input: { cancellationReason: $cancellationReason }) {\n      id\n      cancelledAt\n      cancellationReason\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Management_GetBookingProviders {\n    me {\n      bookingProviders {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n"): (typeof documents)["\n  query Management_GetBookingProviders {\n    me {\n      bookingProviders {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Management_CreateService($bookingProviderId: ID!, $name: String!, $description: String) {\n    createService(input: { name: $name, description: $description, bookingProviderId: $bookingProviderId }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Management_CreateService($bookingProviderId: ID!, $name: String!, $description: String) {\n    createService(input: { name: $name, description: $description, bookingProviderId: $bookingProviderId }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Management_GetService($serviceId: ID!) {\n    service(id: $serviceId) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query Management_GetService($serviceId: ID!) {\n    service(id: $serviceId) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Management_UpdateService($id: ID!, $name: String!, $description: String) {\n    updateService(id: $id, input: { name: $name, description: $description }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Management_UpdateService($id: ID!, $name: String!, $description: String) {\n    updateService(id: $id, input: { name: $name, description: $description }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteService($id: ID!) {\n    deleteService(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteService($id: ID!) {\n    deleteService(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Management_GetServices($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      services {\n        id\n        name\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query Management_GetServices($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      services {\n        id\n        name\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Management_GetBookingProvider($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n      coverImage {\n        id\n        fullUrl\n        baseName\n      }\n      galleryImages {\n        id\n        fullUrl\n        baseName\n      }\n    }\n  }\n"): (typeof documents)["\n  query Management_GetBookingProvider($id: ID!) {\n    bookingProvider(id: $id) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n      coverImage {\n        id\n        fullUrl\n        baseName\n      }\n      galleryImages {\n        id\n        fullUrl\n        baseName\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Management_UpdateBookingProvider($id: ID!, $name: String!, $email: String!, $phone: String!, $website: String, $address: String!, $aboutUs: String!, $isActive: Boolean!) {\n    updateBookingProvider(id: $id, input: {\n      name: $name,\n      email: $email,\n      phone: $phone,\n      website: $website,\n      address: $address,\n      aboutUs: $aboutUs,\n      isActive: $isActive\n    }) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n    }\n  }\n"): (typeof documents)["\n  mutation Management_UpdateBookingProvider($id: ID!, $name: String!, $email: String!, $phone: String!, $website: String, $address: String!, $aboutUs: String!, $isActive: Boolean!) {\n    updateBookingProvider(id: $id, input: {\n      name: $name,\n      email: $email,\n      phone: $phone,\n      website: $website,\n      address: $address,\n      aboutUs: $aboutUs,\n      isActive: $isActive\n    }) {\n      id\n      name\n      email\n      phone\n      website\n      address\n      aboutUs\n      isActive\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Management_DeleteBookingProviderCoverImage($id: ID!, $bookingProviderId: ID!) {\n    deleteBookingProviderCoverImage(id: $id, bookingProviderId: $bookingProviderId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Management_DeleteBookingProviderCoverImage($id: ID!, $bookingProviderId: ID!) {\n    deleteBookingProviderCoverImage(id: $id, bookingProviderId: $bookingProviderId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Management_DeleteBookingProviderGalleryImage($id: ID!, $bookingProviderId: ID!) {\n    deleteBookingProviderGalleryImage(id: $id, bookingProviderId: $bookingProviderId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Management_DeleteBookingProviderGalleryImage($id: ID!, $bookingProviderId: ID!) {\n    deleteBookingProviderGalleryImage(id: $id, bookingProviderId: $bookingProviderId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Management_GetWeekdaySchedule($id: ID!) {\n    weekdaySchedule(id: $id) {\n      id\n      weekday\n      isActive\n      openTime\n      closeTime\n    }\n  }\n"): (typeof documents)["\n  query Management_GetWeekdaySchedule($id: ID!) {\n    weekdaySchedule(id: $id) {\n      id\n      weekday\n      isActive\n      openTime\n      closeTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Management_UpdateWeekdaySchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!) {\n    updateWeekdaySchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime }) {\n      id\n      weekday\n      isActive\n      openTime\n      closeTime\n    }\n  }\n"): (typeof documents)["\n  mutation Management_UpdateWeekdaySchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!) {\n    updateWeekdaySchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime }) {\n      id\n      weekday\n      isActive\n      openTime\n      closeTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Management_GetServiceSchedules($id: ID!) {\n    weekdaySchedule(id: $id) {\n      serviceSchedules {\n        id\n        openTime\n        closeTime\n        isActive\n        service {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Management_GetServiceSchedules($id: ID!) {\n    weekdaySchedule(id: $id) {\n      serviceSchedules {\n        id\n        openTime\n        closeTime\n        isActive\n        service {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Management_GetWeekdaySchedules($bookingProviderId: ID!) {\n    bookingProvider(id: $bookingProviderId) {\n      weekdaySchedules {\n        id\n        weekday\n        openTime\n        closeTime\n        isActive\n      }\n    }\n  }\n"): (typeof documents)["\n  query Management_GetWeekdaySchedules($bookingProviderId: ID!) {\n    bookingProvider(id: $bookingProviderId) {\n      weekdaySchedules {\n        id\n        weekday\n        openTime\n        closeTime\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Management_EditWeekdaySchedule($id: ID!) {\n    weekdaySchedule(id: $id) {\n      openTime\n      closeTime\n      bookingProvider {\n        services {\n          id\n          name\n        }\n      }\n    }\n   }\n"): (typeof documents)["\n  query Management_EditWeekdaySchedule($id: ID!) {\n    weekdaySchedule(id: $id) {\n      openTime\n      closeTime\n      bookingProvider {\n        services {\n          id\n          name\n        }\n      }\n    }\n   }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Management_CreateServiceSchedule($weekdayScheduleId: ID!, $serviceId: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {\n    createServiceSchedule(input: {\n      weekdayScheduleId: $weekdayScheduleId,\n      serviceId: $serviceId,\n      isActive: $isActive,\n      openTime: $openTime,\n      closeTime: $closeTime,\n      maxBookings: $maxBookings,\n      timeSpan: $timeSpan\n    }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Management_CreateServiceSchedule($weekdayScheduleId: ID!, $serviceId: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {\n    createServiceSchedule(input: {\n      weekdayScheduleId: $weekdayScheduleId,\n      serviceId: $serviceId,\n      isActive: $isActive,\n      openTime: $openTime,\n      closeTime: $closeTime,\n      maxBookings: $maxBookings,\n      timeSpan: $timeSpan\n    }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Management_GetServiceSchedule($id: ID!) {\n    serviceSchedule(id: $id) {\n      id\n      isActive\n      openTime\n      closeTime\n      maxBookings\n      timeSpan\n      service {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Management_GetServiceSchedule($id: ID!) {\n    serviceSchedule(id: $id) {\n      id\n      isActive\n      openTime\n      closeTime\n      maxBookings\n      timeSpan\n      service {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Management_DeleteServiceSchedule($id: ID!) {\n    deleteServiceSchedule(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Management_DeleteServiceSchedule($id: ID!) {\n    deleteServiceSchedule(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Management_UpdateServiceSchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {\n    updateServiceSchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime, maxBookings: $maxBookings, timeSpan: $timeSpan }) {\n      id\n      isActive\n      openTime\n      closeTime\n      maxBookings\n      timeSpan\n    }\n  }\n"): (typeof documents)["\n  mutation Management_UpdateServiceSchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {\n    updateServiceSchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime, maxBookings: $maxBookings, timeSpan: $timeSpan }) {\n      id\n      isActive\n      openTime\n      closeTime\n      maxBookings\n      timeSpan\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyBookings {\n    me {\n      id\n      bookings {\n        id\n        cancelledAt\n        cancellationReason\n        date\n        timeSlot\n        serviceSchedule {\n          id\n          weekdaySchedule {\n            bookingProvider {\n              id\n              name\n            }\n          }\n          service {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMyBookings {\n    me {\n      id\n      bookings {\n        id\n        cancelledAt\n        cancellationReason\n        date\n        timeSlot\n        serviceSchedule {\n          id\n          weekdaySchedule {\n            bookingProvider {\n              id\n              name\n            }\n          }\n          service {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CancelBooking($bookingId: ID!) {\n    cancelBooking(id: $bookingId, input: { cancellationReason: \"User cancelled\" }) {\n      id\n      cancelledAt\n      cancellationReason\n    }\n  }\n"): (typeof documents)["\n  mutation CancelBooking($bookingId: ID!) {\n    cancelBooking(id: $bookingId, input: { cancellationReason: \"User cancelled\" }) {\n      id\n      cancelledAt\n      cancellationReason\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAsideFilterData {\n    categories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAsideFilterData {\n    categories {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookingProviders($categories: [ID!], $date: Date, $address: String, $page: Int, $first: Int) {\n    bookingProviders(categories: $categories, date: $date, address: $address, page: $page, first: $first) {\n      data {\n        id\n        name\n        address\n        category {\n          name\n        }\n        coverImage {\n          fullUrl\n        }\n        weekdaySchedules {\n          weekday\n          openTime\n          closeTime\n        }\n      }\n      paginatorInfo {\n        perPage\n        total\n        currentPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBookingProviders($categories: [ID!], $date: Date, $address: String, $page: Int, $first: Int) {\n    bookingProviders(categories: $categories, date: $date, address: $address, page: $page, first: $first) {\n      data {\n        id\n        name\n        address\n        category {\n          name\n        }\n        coverImage {\n          fullUrl\n        }\n        weekdaySchedules {\n          weekday\n          openTime\n          closeTime\n        }\n      }\n      paginatorInfo {\n        perPage\n        total\n        currentPage\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;