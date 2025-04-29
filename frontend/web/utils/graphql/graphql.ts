/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: { input: any; output: any; }
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: { input: any; output: any; }
  /** A datetime string in ISO 8601 format in UTC with nanoseconds `YYYY-MM-DDTHH:mm:ss.SSSSSSZ`, e.g. `2020-04-20T16:20:04.000000Z`. */
  DateTimeUtc: { input: any; output: any; }
};

export type BookedTimeSlot = {
  __typename?: 'BookedTimeSlot';
  currentBookings?: Maybe<Scalars['Int']['output']>;
  timeSlot?: Maybe<Scalars['Int']['output']>;
};

export type Booking = {
  __typename?: 'Booking';
  cancellationReason?: Maybe<Scalars['String']['output']>;
  cancelledAt?: Maybe<Scalars['DateTimeUtc']['output']>;
  createdAt: Scalars['DateTimeUtc']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  serviceSchedule: ServiceSchedule;
  timeSlot: Scalars['Int']['output'];
  updatedAt: Scalars['DateTimeUtc']['output'];
  user: User;
};

export type BookingProvider = {
  __typename?: 'BookingProvider';
  aboutUs: Scalars['String']['output'];
  address: Scalars['String']['output'];
  category: Category;
  coverImage?: Maybe<Media>;
  createdAt: Scalars['DateTimeUtc']['output'];
  email: Scalars['String']['output'];
  galleryImages?: Maybe<Array<Maybe<Media>>>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  services: Array<Service>;
  updatedAt: Scalars['DateTimeUtc']['output'];
  user: User;
  website?: Maybe<Scalars['String']['output']>;
  weekdaySchedules: Array<WeekdaySchedule>;
};

/** A paginated list of BookingProvider items. */
export type BookingProviderPaginator = {
  __typename?: 'BookingProviderPaginator';
  /** A list of BookingProvider items. */
  data: Array<BookingProvider>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type CancelBookingInput = {
  cancellationReason: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  bookingProviders: Array<BookingProvider>;
  createdAt: Scalars['DateTimeUtc']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeUtc']['output'];
};

export type CreateBookingInput = {
  date: Scalars['Date']['input'];
  serviceScheduleId: Scalars['ID']['input'];
  timeSlot: Scalars['Int']['input'];
};

export type CreateBookingProviderInput = {
  aboutUs: Scalars['String']['input'];
  address: Scalars['String']['input'];
  categoryId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateServiceInput = {
  bookingProviderId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateServiceScheduleInput = {
  closeTime: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
  maxBookings: Scalars['Int']['input'];
  openTime: Scalars['Int']['input'];
  serviceId: Scalars['ID']['input'];
  timeSpan: Scalars['Int']['input'];
  weekdayScheduleId: Scalars['ID']['input'];
};

export type Media = {
  __typename?: 'Media';
  baseName: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  fullUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelBooking?: Maybe<Booking>;
  createBooking: Booking;
  createBookingProvider: BookingProvider;
  createService: Service;
  createServiceSchedule: ServiceSchedule;
  deleteBookingProvider?: Maybe<BookingProvider>;
  deleteBookingProviderCoverImage?: Maybe<Media>;
  deleteBookingProviderGalleryImage?: Maybe<Media>;
  deleteService?: Maybe<Service>;
  deleteServiceSchedule?: Maybe<ServiceSchedule>;
  updateBookingProvider?: Maybe<BookingProvider>;
  updateService?: Maybe<Service>;
  updateServiceSchedule?: Maybe<ServiceSchedule>;
  updateWeekdaySchedule?: Maybe<WeekdaySchedule>;
};


export type MutationCancelBookingArgs = {
  id: Scalars['ID']['input'];
  input: CancelBookingInput;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateBookingProviderArgs = {
  input: CreateBookingProviderInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationCreateServiceScheduleArgs = {
  input: CreateServiceScheduleInput;
};


export type MutationDeleteBookingProviderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteBookingProviderCoverImageArgs = {
  bookingProviderId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationDeleteBookingProviderGalleryImageArgs = {
  bookingProviderId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationDeleteServiceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteServiceScheduleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBookingProviderArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBookingProviderInput;
};


export type MutationUpdateServiceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateServiceInput;
};


export type MutationUpdateServiceScheduleArgs = {
  id: Scalars['ID']['input'];
  input: UpdateServiceScheduleInput;
};


export type MutationUpdateWeekdayScheduleArgs = {
  id: Scalars['ID']['input'];
  input: UpdateWeekdayScheduleInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  bookingProvider?: Maybe<BookingProvider>;
  bookingProviders: BookingProviderPaginator;
  bookings: Array<Booking>;
  categories: Array<Category>;
  me?: Maybe<User>;
  randomBookingProviders: Array<BookingProvider>;
  randomCategories: Array<Category>;
  service?: Maybe<Service>;
  serviceDatepicker: Array<ServiceDatepicker>;
  serviceSchedule?: Maybe<ServiceSchedule>;
  services: ServicePaginator;
  weekdaySchedule?: Maybe<WeekdaySchedule>;
};


export type QueryBookingProviderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookingProvidersArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<Scalars['ID']['input']>>;
  date?: InputMaybe<Scalars['Date']['input']>;
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBookingsArgs = {
  bookingProviderId: Scalars['ID']['input'];
};


export type QueryRandomBookingProvidersArgs = {
  limit?: Scalars['Int']['input'];
};


export type QueryRandomCategoriesArgs = {
  limit?: Scalars['Int']['input'];
};


export type QueryServiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceDatepickerArgs = {
  date: Scalars['Date']['input'];
  serviceId: Scalars['ID']['input'];
};


export type QueryServiceScheduleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServicesArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryWeekdayScheduleArgs = {
  id: Scalars['ID']['input'];
};

export type Service = {
  __typename?: 'Service';
  bookingProvider: BookingProvider;
  createdAt: Scalars['DateTimeUtc']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeUtc']['output'];
};

export type ServiceDatepicker = {
  __typename?: 'ServiceDatepicker';
  bookedTimeSlots: Array<BookedTimeSlot>;
  serviceSchedule: ServiceSchedule;
};

/** A paginated list of Service items. */
export type ServicePaginator = {
  __typename?: 'ServicePaginator';
  /** A list of Service items. */
  data: Array<Service>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type ServiceSchedule = {
  __typename?: 'ServiceSchedule';
  closeTime: Scalars['Int']['output'];
  createdAt: Scalars['DateTimeUtc']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  maxBookings: Scalars['Int']['output'];
  openTime: Scalars['Int']['output'];
  service: Service;
  timeSpan: Scalars['Int']['output'];
  updatedAt: Scalars['DateTimeUtc']['output'];
  weekdaySchedule: WeekdaySchedule;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpdateBookingProviderInput = {
  aboutUs: Scalars['String']['input'];
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateServiceScheduleInput = {
  closeTime: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
  maxBookings: Scalars['Int']['input'];
  openTime: Scalars['Int']['input'];
  timeSpan: Scalars['Int']['input'];
};

export type UpdateWeekdayScheduleInput = {
  closeTime: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
  openTime: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  bookingProviders: Array<BookingProvider>;
  bookings: Array<Booking>;
  createdAt: Scalars['DateTimeUtc']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeUtc']['output'];
};

export type WeekdaySchedule = {
  __typename?: 'WeekdaySchedule';
  bookingProvider: BookingProvider;
  closeTime: Scalars['Int']['output'];
  createdAt: Scalars['DateTimeUtc']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  openTime: Scalars['Int']['output'];
  serviceSchedules: Array<ServiceSchedule>;
  updatedAt: Scalars['DateTimeUtc']['output'];
  weekday: Scalars['Int']['output'];
};

export type GetBookingProviderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBookingProviderQuery = { __typename?: 'Query', bookingProvider?: { __typename?: 'BookingProvider', id: string, name: string, email: string, phone: string, website?: string | null, address: string, aboutUs: string, isActive: boolean, galleryImages?: Array<{ __typename?: 'Media', fullUrl: string } | null> | null, weekdaySchedules: Array<{ __typename?: 'WeekdaySchedule', weekday: number, openTime: number, closeTime: number, isActive: boolean }>, services: Array<{ __typename?: 'Service', id: string, name: string }> } | null };

export type GetDatepickerInfoForServiceQueryVariables = Exact<{
  serviceId: Scalars['ID']['input'];
  date: Scalars['Date']['input'];
}>;


export type GetDatepickerInfoForServiceQuery = { __typename?: 'Query', serviceDatepicker: Array<{ __typename?: 'ServiceDatepicker', serviceSchedule: { __typename?: 'ServiceSchedule', id: string, openTime: number, closeTime: number, maxBookings: number, timeSpan: number, service: { __typename?: 'Service', name: string } }, bookedTimeSlots: Array<{ __typename?: 'BookedTimeSlot', timeSlot?: number | null, currentBookings?: number | null }> }> };

export type RequestBookingMutationVariables = Exact<{
  serviceScheduleId: Scalars['ID']['input'];
  date: Scalars['Date']['input'];
  timeSlot: Scalars['Int']['input'];
}>;


export type RequestBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: string } };

export type GetRandomBookingProvidersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRandomBookingProvidersQuery = { __typename?: 'Query', randomBookingProviders: Array<{ __typename?: 'BookingProvider', id: string, name: string, address: string, category: { __typename?: 'Category', name: string }, coverImage?: { __typename?: 'Media', fullUrl: string } | null }> };

export type GetRandomCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRandomCategoriesQuery = { __typename?: 'Query', randomCategories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type Management_GetBookingsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Management_GetBookingsQuery = { __typename?: 'Query', bookings: Array<{ __typename?: 'Booking', id: string, date: any, timeSlot: number, cancelledAt?: any | null, cancellationReason?: string | null, serviceSchedule: { __typename?: 'ServiceSchedule', service: { __typename?: 'Service', id: string, name: string } }, user: { __typename?: 'User', id: string, name: string, email: string } }> };

export type Management_CancelBookingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  cancellationReason: Scalars['String']['input'];
}>;


export type Management_CancelBookingMutation = { __typename?: 'Mutation', cancelBooking?: { __typename?: 'Booking', id: string, cancelledAt?: any | null, cancellationReason?: string | null } | null };

export type Management_GetBookingProvidersQueryVariables = Exact<{ [key: string]: never; }>;


export type Management_GetBookingProvidersQuery = { __typename?: 'Query', me?: { __typename?: 'User', bookingProviders: Array<{ __typename?: 'BookingProvider', id: string, name: string, email: string, phone: string }> } | null };

export type Management_CreateServiceMutationVariables = Exact<{
  bookingProviderId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type Management_CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'Service', id: string } };

export type Management_GetServiceQueryVariables = Exact<{
  serviceId: Scalars['ID']['input'];
}>;


export type Management_GetServiceQuery = { __typename?: 'Query', service?: { __typename?: 'Service', id: string, name: string, description?: string | null } | null };

export type Management_UpdateServiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type Management_UpdateServiceMutation = { __typename?: 'Mutation', updateService?: { __typename?: 'Service', id: string } | null };

export type DeleteServiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService?: { __typename?: 'Service', id: string } | null };

export type Management_GetServicesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Management_GetServicesQuery = { __typename?: 'Query', bookingProvider?: { __typename?: 'BookingProvider', id: string, services: Array<{ __typename?: 'Service', id: string, name: string, description?: string | null }> } | null };

export type Management_GetBookingProviderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Management_GetBookingProviderQuery = { __typename?: 'Query', bookingProvider?: { __typename?: 'BookingProvider', id: string, name: string, email: string, phone: string, website?: string | null, address: string, aboutUs: string, isActive: boolean, coverImage?: { __typename?: 'Media', id: string, fullUrl: string, baseName: string } | null, galleryImages?: Array<{ __typename?: 'Media', id: string, fullUrl: string, baseName: string } | null> | null } | null };

export type Management_UpdateBookingProviderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
  address: Scalars['String']['input'];
  aboutUs: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
}>;


export type Management_UpdateBookingProviderMutation = { __typename?: 'Mutation', updateBookingProvider?: { __typename?: 'BookingProvider', id: string, name: string, email: string, phone: string, website?: string | null, address: string, aboutUs: string, isActive: boolean } | null };

export type Management_DeleteBookingProviderCoverImageMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  bookingProviderId: Scalars['ID']['input'];
}>;


export type Management_DeleteBookingProviderCoverImageMutation = { __typename?: 'Mutation', deleteBookingProviderCoverImage?: { __typename?: 'Media', id: string } | null };

export type Management_DeleteBookingProviderGalleryImageMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  bookingProviderId: Scalars['ID']['input'];
}>;


export type Management_DeleteBookingProviderGalleryImageMutation = { __typename?: 'Mutation', deleteBookingProviderGalleryImage?: { __typename?: 'Media', id: string } | null };

export type Management_GetWeekdayScheduleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Management_GetWeekdayScheduleQuery = { __typename?: 'Query', weekdaySchedule?: { __typename?: 'WeekdaySchedule', id: string, weekday: number, isActive: boolean, openTime: number, closeTime: number } | null };

export type Management_UpdateWeekdayScheduleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  isActive: Scalars['Boolean']['input'];
  openTime: Scalars['Int']['input'];
  closeTime: Scalars['Int']['input'];
}>;


export type Management_UpdateWeekdayScheduleMutation = { __typename?: 'Mutation', updateWeekdaySchedule?: { __typename?: 'WeekdaySchedule', id: string, weekday: number, isActive: boolean, openTime: number, closeTime: number } | null };

export type Management_GetServiceSchedulesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Management_GetServiceSchedulesQuery = { __typename?: 'Query', weekdaySchedule?: { __typename?: 'WeekdaySchedule', serviceSchedules: Array<{ __typename?: 'ServiceSchedule', id: string, openTime: number, closeTime: number, isActive: boolean, service: { __typename?: 'Service', name: string } }> } | null };

export type Management_GetWeekdaySchedulesQueryVariables = Exact<{
  bookingProviderId: Scalars['ID']['input'];
}>;


export type Management_GetWeekdaySchedulesQuery = { __typename?: 'Query', bookingProvider?: { __typename?: 'BookingProvider', weekdaySchedules: Array<{ __typename?: 'WeekdaySchedule', id: string, weekday: number, openTime: number, closeTime: number, isActive: boolean }> } | null };

export type Management_EditWeekdayScheduleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Management_EditWeekdayScheduleQuery = { __typename?: 'Query', weekdaySchedule?: { __typename?: 'WeekdaySchedule', openTime: number, closeTime: number, bookingProvider: { __typename?: 'BookingProvider', services: Array<{ __typename?: 'Service', id: string, name: string }> } } | null };

export type Management_CreateServiceScheduleMutationVariables = Exact<{
  weekdayScheduleId: Scalars['ID']['input'];
  serviceId: Scalars['ID']['input'];
  isActive: Scalars['Boolean']['input'];
  openTime: Scalars['Int']['input'];
  closeTime: Scalars['Int']['input'];
  maxBookings: Scalars['Int']['input'];
  timeSpan: Scalars['Int']['input'];
}>;


export type Management_CreateServiceScheduleMutation = { __typename?: 'Mutation', createServiceSchedule: { __typename?: 'ServiceSchedule', id: string } };

export type Management_GetServiceScheduleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Management_GetServiceScheduleQuery = { __typename?: 'Query', serviceSchedule?: { __typename?: 'ServiceSchedule', id: string, isActive: boolean, openTime: number, closeTime: number, maxBookings: number, timeSpan: number, service: { __typename?: 'Service', name: string } } | null };

export type Management_DeleteServiceScheduleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type Management_DeleteServiceScheduleMutation = { __typename?: 'Mutation', deleteServiceSchedule?: { __typename?: 'ServiceSchedule', id: string } | null };

export type Management_UpdateServiceScheduleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  isActive: Scalars['Boolean']['input'];
  openTime: Scalars['Int']['input'];
  closeTime: Scalars['Int']['input'];
  maxBookings: Scalars['Int']['input'];
  timeSpan: Scalars['Int']['input'];
}>;


export type Management_UpdateServiceScheduleMutation = { __typename?: 'Mutation', updateServiceSchedule?: { __typename?: 'ServiceSchedule', id: string, isActive: boolean, openTime: number, closeTime: number, maxBookings: number, timeSpan: number } | null };

export type GetMyBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBookingsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, bookings: Array<{ __typename?: 'Booking', id: string, cancelledAt?: any | null, cancellationReason?: string | null, date: any, timeSlot: number, serviceSchedule: { __typename?: 'ServiceSchedule', id: string, weekdaySchedule: { __typename?: 'WeekdaySchedule', bookingProvider: { __typename?: 'BookingProvider', id: string, name: string } }, service: { __typename?: 'Service', id: string, name: string } } }> } | null };

export type CancelBookingMutationVariables = Exact<{
  bookingId: Scalars['ID']['input'];
}>;


export type CancelBookingMutation = { __typename?: 'Mutation', cancelBooking?: { __typename?: 'Booking', id: string, cancelledAt?: any | null, cancellationReason?: string | null } | null };

export type GetAsideFilterDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAsideFilterDataQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type GetBookingProvidersQueryVariables = Exact<{
  categories?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetBookingProvidersQuery = { __typename?: 'Query', bookingProviders: { __typename?: 'BookingProviderPaginator', data: Array<{ __typename?: 'BookingProvider', id: string, name: string, address: string, category: { __typename?: 'Category', name: string }, coverImage?: { __typename?: 'Media', fullUrl: string } | null, weekdaySchedules: Array<{ __typename?: 'WeekdaySchedule', weekday: number, openTime: number, closeTime: number }> }>, paginatorInfo: { __typename?: 'PaginatorInfo', perPage: number, total: number, currentPage: number } } };


export const GetBookingProviderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingProvider"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingProvider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"aboutUs"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"galleryImages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weekdaySchedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekday"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"services"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookingProviderQuery, GetBookingProviderQueryVariables>;
export const GetDatepickerInfoForServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDatepickerInfoForService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceDatepicker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maxBookings"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpan"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookedTimeSlots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeSlot"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookings"}}]}}]}}]}}]} as unknown as DocumentNode<GetDatepickerInfoForServiceQuery, GetDatepickerInfoForServiceQueryVariables>;
export const RequestBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceScheduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeSlot"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"serviceScheduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceScheduleId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"timeSlot"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeSlot"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RequestBookingMutation, RequestBookingMutationVariables>;
export const GetRandomBookingProvidersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRandomBookingProviders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"randomBookingProviders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetRandomBookingProvidersQuery, GetRandomBookingProvidersQueryVariables>;
export const GetRandomCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRandomCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"randomCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"6"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetRandomCategoriesQuery, GetRandomCategoriesQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const Management_GetBookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Management_GetBookings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingProviderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"timeSlot"}},{"kind":"Field","name":{"kind":"Name","value":"serviceSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAt"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationReason"}}]}}]}}]} as unknown as DocumentNode<Management_GetBookingsQuery, Management_GetBookingsQueryVariables>;
export const Management_CancelBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Management_CancelBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cancellationReason"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cancellationReason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cancellationReason"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAt"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationReason"}}]}}]}}]} as unknown as DocumentNode<Management_CancelBookingMutation, Management_CancelBookingMutationVariables>;
export const Management_GetBookingProvidersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Management_GetBookingProviders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingProviders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]} as unknown as DocumentNode<Management_GetBookingProvidersQuery, Management_GetBookingProvidersQueryVariables>;
export const Management_CreateServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Management_CreateService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingProviderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"bookingProviderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingProviderId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Management_CreateServiceMutation, Management_CreateServiceMutationVariables>;
export const Management_GetServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Management_GetService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"service"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<Management_GetServiceQuery, Management_GetServiceQueryVariables>;
export const Management_UpdateServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Management_UpdateService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Management_UpdateServiceMutation, Management_UpdateServiceMutationVariables>;
export const DeleteServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const Management_GetServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Management_GetServices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingProvider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"services"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<Management_GetServicesQuery, Management_GetServicesQueryVariables>;
export const Management_GetBookingProviderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Management_GetBookingProvider"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingProvider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"aboutUs"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullUrl"}},{"kind":"Field","name":{"kind":"Name","value":"baseName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"galleryImages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullUrl"}},{"kind":"Field","name":{"kind":"Name","value":"baseName"}}]}}]}}]}}]} as unknown as DocumentNode<Management_GetBookingProviderQuery, Management_GetBookingProviderQueryVariables>;
export const Management_UpdateBookingProviderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Management_UpdateBookingProvider"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"website"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"aboutUs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookingProvider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"website"},"value":{"kind":"Variable","name":{"kind":"Name","value":"website"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"aboutUs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"aboutUs"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"aboutUs"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<Management_UpdateBookingProviderMutation, Management_UpdateBookingProviderMutationVariables>;
export const Management_DeleteBookingProviderCoverImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Management_DeleteBookingProviderCoverImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingProviderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBookingProviderCoverImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"bookingProviderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingProviderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Management_DeleteBookingProviderCoverImageMutation, Management_DeleteBookingProviderCoverImageMutationVariables>;
export const Management_DeleteBookingProviderGalleryImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Management_DeleteBookingProviderGalleryImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingProviderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBookingProviderGalleryImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"bookingProviderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingProviderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Management_DeleteBookingProviderGalleryImageMutation, Management_DeleteBookingProviderGalleryImageMutationVariables>;
export const Management_GetWeekdayScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Management_GetWeekdaySchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekdaySchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"weekday"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}}]}}]}}]} as unknown as DocumentNode<Management_GetWeekdayScheduleQuery, Management_GetWeekdayScheduleQueryVariables>;
export const Management_UpdateWeekdayScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Management_UpdateWeekdaySchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"openTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"closeTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWeekdaySchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"openTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"openTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"closeTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"closeTime"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"weekday"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}}]}}]}}]} as unknown as DocumentNode<Management_UpdateWeekdayScheduleMutation, Management_UpdateWeekdayScheduleMutationVariables>;
export const Management_GetServiceSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Management_GetServiceSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekdaySchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceSchedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Management_GetServiceSchedulesQuery, Management_GetServiceSchedulesQueryVariables>;
export const Management_GetWeekdaySchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Management_GetWeekdaySchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingProviderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingProvider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingProviderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekdaySchedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"weekday"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<Management_GetWeekdaySchedulesQuery, Management_GetWeekdaySchedulesQueryVariables>;
export const Management_EditWeekdayScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Management_EditWeekdaySchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekdaySchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}},{"kind":"Field","name":{"kind":"Name","value":"bookingProvider"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"services"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Management_EditWeekdayScheduleQuery, Management_EditWeekdayScheduleQueryVariables>;
export const Management_CreateServiceScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Management_CreateServiceSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weekdayScheduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"openTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"closeTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxBookings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeSpan"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createServiceSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"weekdayScheduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weekdayScheduleId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"openTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"openTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"closeTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"closeTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxBookings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxBookings"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"timeSpan"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeSpan"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Management_CreateServiceScheduleMutation, Management_CreateServiceScheduleMutationVariables>;
export const Management_GetServiceScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Management_GetServiceSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxBookings"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpan"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<Management_GetServiceScheduleQuery, Management_GetServiceScheduleQueryVariables>;
export const Management_DeleteServiceScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Management_DeleteServiceSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteServiceSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Management_DeleteServiceScheduleMutation, Management_DeleteServiceScheduleMutationVariables>;
export const Management_UpdateServiceScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Management_UpdateServiceSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"openTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"closeTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxBookings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeSpan"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateServiceSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"openTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"openTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"closeTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"closeTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxBookings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxBookings"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"timeSpan"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeSpan"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxBookings"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpan"}}]}}]}}]} as unknown as DocumentNode<Management_UpdateServiceScheduleMutation, Management_UpdateServiceScheduleMutationVariables>;
export const GetMyBookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyBookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAt"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationReason"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"timeSlot"}},{"kind":"Field","name":{"kind":"Name","value":"serviceSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"weekdaySchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingProvider"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMyBookingsQuery, GetMyBookingsQueryVariables>;
export const CancelBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cancellationReason"},"value":{"kind":"StringValue","value":"User cancelled","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAt"}},{"kind":"Field","name":{"kind":"Name","value":"cancellationReason"}}]}}]}}]} as unknown as DocumentNode<CancelBookingMutation, CancelBookingMutationVariables>;
export const GetAsideFilterDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAsideFilterData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAsideFilterDataQuery, GetAsideFilterDataQueryVariables>;
export const GetBookingProvidersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingProviders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categories"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingProviders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categories"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weekdaySchedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekday"}},{"kind":"Field","name":{"kind":"Name","value":"openTime"}},{"kind":"Field","name":{"kind":"Name","value":"closeTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookingProvidersQuery, GetBookingProvidersQueryVariables>;