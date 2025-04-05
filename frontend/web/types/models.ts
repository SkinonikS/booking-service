export interface WeekdaySchedule {
  id: string;
  weekday: number;
  isActive: boolean;
  openTime: number;
  closeTime: number;
}

export interface ServiceSchedule {
  id: string;
  isActive: boolean;
  openTime: number;
  closeTime: number;
  maxBookings: number;
  timeSpan: number;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
}

export interface BookingProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  aboutUs: string;
  website?: string;
  isActive: boolean;
}

export interface Booking {
  id: string;
  date: string;
  timeSlot: number;
  cancelledAt?: string;
  cancellationReason?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cognitoId: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Media {
  id: string;
  fullUrl: string;
  baseName: string;
  fileSize: number;
}
