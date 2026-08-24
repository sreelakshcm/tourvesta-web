import ButtonComponent from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import {
  Booking,
  useGetMyAssignedBookingsQuery,
  useRequestBookingRejectionMutation,
} from '@features/bookings/bookingApi';
import { FormEvent, useState } from 'react';

const GuideDashboard = (): JSX.Element => {
  const { data: bookings = [], isLoading, error } = useGetMyAssignedBookingsQuery();
  const [requestRejection, { isLoading: isRequesting }] = useRequestBookingRejectionMutation();
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState<string>();

  const activeBookings = bookings.filter((booking) => booking.status !== 'cancelled');
  const pendingRequests = bookings.filter((booking) => booking.guideRejectionRequest?.status === 'pending').length;

  const submitRequest = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!selectedBooking || !reason.trim()) return;
    try {
      setMessage(undefined);
      await requestRejection({ id: selectedBooking._id, reason: reason.trim() }).unwrap();
      setMessage('Your request was sent to the administrator.');
      setSelectedBooking(undefined);
      setReason('');
    } catch (requestError) {
      const apiError = requestError as { data?: { message?: string } };
      setMessage(apiError.data?.message || 'Unable to send this request.');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto max-w-6xl space-y-7 p-1">
      <header className="rounded-xl bg-gradient-to-r from-primary to-primary-hover p-6 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Guide workspace</p>
        <h1 className="mt-2 text-3xl font-bold">Your assigned sessions</h1>
        <p className="mt-2 max-w-2xl text-white/90">Review the guests and tours you are guiding. If you cannot lead a session, request an administrator to reject it.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-lg dark:bg-neutral-layout">
          <p className="text-sm text-gray-500 dark:text-gray-400">Active assignments</p>
          <p className="mt-1 text-3xl font-bold text-primary">{activeBookings.length}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-lg dark:bg-neutral-layout">
          <p className="text-sm text-gray-500 dark:text-gray-400">Requests awaiting review</p>
          <p className="mt-1 text-3xl font-bold text-primary">{pendingRequests}</p>
        </div>
      </section>

      {message && <p className="rounded-lg bg-primary/10 p-3 text-sm text-primary">{message}</p>}
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">We could not load your assignments.</p>}
      {!error && bookings.length === 0 && (
        <div className="rounded-xl bg-white p-10 text-center shadow-lg dark:bg-neutral-layout">
          <h2 className="text-xl font-bold">No sessions assigned yet</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">New assignments will appear here.</p>
        </div>
      )}
      <section className="space-y-4">
        {bookings.map((booking) => {
          const request = booking.guideRejectionRequest;
          const canRequest = booking.status !== 'cancelled' && request?.status !== 'pending';
          return (
            <article key={booking._id} className="rounded-xl bg-white p-5 shadow-lg dark:bg-neutral-layout">
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div>
                  <h2 className="text-xl font-bold text-primary">{booking.tour.name}</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{booking.tour.startLocation?.description} · {booking.tour.duration} days</p>
                  <p className="mt-3 text-sm"><span className="font-semibold">Guest:</span> {booking.user?.name || 'Guest'} {booking.user?.email ? `(${booking.user.email})` : ''}</p>
                  <p className="mt-1 text-sm"><span className="font-semibold">Reserved:</span> {new Date(booking.bookedAt).toLocaleDateString()} · {booking.guests} guest{booking.guests === 1 ? '' : 's'}</p>
                  <p className="mt-1 text-sm"><span className="font-semibold">Departure:</span> {new Date(booking.startDate).toLocaleDateString()}</p>
                </div>
                <span className="h-fit rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold capitalize text-primary">{booking.status}</span>
              </div>
              {request && <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm dark:bg-neutral-dark">Rejection request: <span className="font-semibold capitalize">{request.status}</span>{request.reason ? ` — ${request.reason}` : ''}</p>}
              {canRequest && (
                <ButtonComponent type="button" onClick={() => { setSelectedBooking(booking); setReason(''); }} className="mt-4 border-red-300 text-red-700" variant="outline">
                  Request session rejection
                </ButtonComponent>
              )}
            </article>
          );
        })}
      </section>

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={submitRequest} className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-layout">
            <h2 className="text-xl font-bold text-primary">Request session rejection</h2>
            <p className="mt-2 text-sm">Tell the administrator why you cannot guide <strong>{selectedBooking.tour.name}</strong>. The booking will remain active until they approve the request.</p>
            <textarea value={reason} onChange={(event) => setReason(event.target.value)} required maxLength={500} rows={5} className="mt-4 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-backgroundDark" placeholder="Reason for the request" />
            <div className="mt-4 flex justify-end gap-3">
              <ButtonComponent type="button" variant="outline" onClick={() => setSelectedBooking(undefined)}>Cancel</ButtonComponent>
              <ButtonComponent type="submit" disabled={isRequesting} className="bg-primary text-white">{isRequesting ? 'Sending…' : 'Send request'}</ButtonComponent>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GuideDashboard;
