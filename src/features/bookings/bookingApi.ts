import { apiSlice } from '@app/api';
import { BOOKINGS } from '@constants/services';
import { User } from 'types/tourTypes';

type ReservationResponse = {
  status: 'success';
  message: string;
};

export type Booking = {
  _id: string;
  price: number;
  guests: number;
  paid: boolean;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookedAt: string;
  startDate: string;
  tour: {
    _id: string;
    name: string;
    imageCover: string;
    duration: number;
    maxGroupSize: number;
    startLocation: { description: string };
    startDates: string[];
  };
  assignedGuide: Pick<User, 'name' | 'email' | 'photo' | 'role'>;
  user?: Pick<User, 'name' | 'email' | 'photo'>;
  guideRejectionRequest?: {
    reason: string;
    status: 'pending' | 'approved' | 'declined';
    requestedAt: string;
  };
};

type BookingsResponse = { status: 'success'; data: Booking[] };

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyBookings: builder.query<Booking[], void>({
      query: () => `${BOOKINGS}/me`,
      transformResponse: (response: BookingsResponse) => response.data,
      providesTags: ['Bookings'],
    }),
    createReservation: builder.mutation<string, { tourId: string; guests: number; startDate: string }>({
      query: ({ tourId, guests, startDate }) => ({
        url: `${BOOKINGS}/${tourId}`,
        method: 'POST',
        body: { guests, startDate },
      }),
      transformResponse: (response: ReservationResponse) => response.message,
      invalidatesTags: ['Bookings'],
    }),
    updateMyBooking: builder.mutation<string, { id: string; guests: number; startDate: string }>({
      query: ({ id, ...body }) => ({ url: `${BOOKINGS}/me/${id}`, method: 'PATCH', body }),
      transformResponse: (response: ReservationResponse) => response.message,
      invalidatesTags: ['Bookings'],
    }),
    cancelMyBooking: builder.mutation<string, string>({
      query: (id) => ({ url: `${BOOKINGS}/me/${id}`, method: 'DELETE' }),
      transformResponse: (response: ReservationResponse) => response.message,
      invalidatesTags: ['Bookings'],
    }),
    getMyAssignedBookings: builder.query<Booking[], void>({
      query: () => `${BOOKINGS}/assigned`,
      transformResponse: (response: BookingsResponse) => response.data,
      providesTags: ['Bookings'],
    }),
    requestBookingRejection: builder.mutation<string, { id: string; reason: string }>({
      query: ({ id, reason }) => ({
        url: `${BOOKINGS}/${id}/rejection-request`,
        method: 'PATCH',
        body: { reason },
      }),
      transformResponse: (response: ReservationResponse) => response.message,
      invalidatesTags: ['Bookings'],
    }),
    getRejectionRequests: builder.query<Booking[], void>({
      query: () => `${BOOKINGS}/rejection-requests`,
      transformResponse: (response: BookingsResponse) => response.data,
      providesTags: ['Bookings'],
    }),
    reviewRejectionRequest: builder.mutation<string, { id: string; decision: 'approved' | 'declined' }>({
      query: ({ id, decision }) => ({
        url: `${BOOKINGS}/${id}/rejection-request/review`,
        method: 'PATCH',
        body: { decision },
      }),
      transformResponse: (response: ReservationResponse) => response.message,
      invalidatesTags: ['Bookings'],
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useUpdateMyBookingMutation,
  useCancelMyBookingMutation,
  useGetMyBookingsQuery,
  useGetMyAssignedBookingsQuery,
  useRequestBookingRejectionMutation,
  useGetRejectionRequestsQuery,
  useReviewRejectionRequestMutation,
} = bookingApi;
