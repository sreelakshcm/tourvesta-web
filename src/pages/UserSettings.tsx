import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Settings from '@features/users/settings/Settings';
import { Cancel02Icon, Menu02Icon } from 'hugeicons-react';
import Reviews from '@features/users/settings/Reviews';
import { useAppSelector } from '@app/hooks';
import { getUserData } from '@features/auth/authSlice';
import { useGetMyBookingsQuery } from '@features/bookings/bookingApi';
import {
  Booking,
  useCancelMyBookingMutation,
  useUpdateMyBookingMutation,
} from '@features/bookings/bookingApi';
import ButtonComponent from '@components/UI/Button';

const UserSettingsPage: React.FC = () => {
  const user = useAppSelector(getUserData);
  const isRegularUser = user?.role === 'user';
  const [searchParams, setSearchParams] = useSearchParams();
  const sections = isRegularUser
    ? ['settings', 'bookings', 'reviews', 'billing']
    : ['settings'];
  const requestedSection = searchParams.get('section');
  const initialSection = requestedSection === 'bookings' && isRegularUser ? 'bookings' : 'settings';
  const [currentSection, setCurrentSection] = useState<
    'settings' | 'bookings' | 'reviews' | 'billing'
  >(initialSection);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [editingBooking, setEditingBooking] = useState<Booking>();
  const [bookingGuests, setBookingGuests] = useState(1);
  const [bookingStartDate, setBookingStartDate] = useState('');
  const [bookingMessage, setBookingMessage] = useState<string>();
  const { data: bookings = [], isLoading: isLoadingBookings } = useGetMyBookingsQuery(
    undefined,
    { skip: !isRegularUser },
  );
  const [updateMyBooking, { isLoading: isUpdatingBooking }] = useUpdateMyBookingMutation();
  const [cancelMyBooking, { isLoading: isCancellingBooking }] = useCancelMyBookingMutation();

  useEffect(() => {
    if (requestedSection === 'bookings' && isRegularUser) setCurrentSection('bookings');
    else if (!requestedSection || !isRegularUser) setCurrentSection('settings');
  }, [isRegularUser, requestedSection]);

  const openBookingEditor = (booking: Booking): void => {
    setBookingMessage(undefined);
    setEditingBooking(booking);
    setBookingGuests(booking.guests);
    setBookingStartDate(booking.startDate);
  };

  const saveBooking = async (): Promise<void> => {
    if (!editingBooking) return;
    try {
      setBookingMessage(undefined);
      await updateMyBooking({ id: editingBooking._id, guests: bookingGuests, startDate: bookingStartDate }).unwrap();
      setEditingBooking(undefined);
      setBookingMessage('Booking updated successfully.');
    } catch (error) {
      const apiError = error as { data?: { message?: string } };
      setBookingMessage(apiError.data?.message || 'Unable to update this booking.');
    }
  };

  const cancelBooking = async (booking: Booking): Promise<void> => {
    try {
      setBookingMessage(undefined);
      await cancelMyBooking(booking._id).unwrap();
      setBookingMessage('Booking cancelled successfully.');
    } catch (error) {
      const apiError = error as { data?: { message?: string } };
      setBookingMessage(apiError.data?.message || 'Unable to cancel this booking.');
    }
  };

  const renderBookingsSection = (): JSX.Element => (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-backgroundDark dark:text-fontDark">
      <h2 className="mb-4 text-xl font-semibold">My Bookings</h2>
      {bookingMessage && <p className="mb-4 rounded-lg bg-primary/10 p-3 text-sm text-primary">{bookingMessage}</p>}
      {isLoadingBookings ? <p>Loading your bookings…</p> : null}
      {!isLoadingBookings && bookings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">You have no bookings yet.</p>
      ) : null}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <article
            key={booking._id}
            className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700 sm:flex-row"
          >
            <img
              src={`/assets/img/tours/${booking.tour.imageCover}`}
              alt={booking.tour.name}
              className="h-24 w-full rounded-lg object-cover sm:w-32"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{booking.tour.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {booking.tour.startLocation?.description} · {booking.tour.duration} days
                  </p>
                </div>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold capitalize text-primary">
                  {booking.status}
                </span>
              </div>
              <div className="mt-3 grid gap-1 text-sm sm:grid-cols-3">
                <p><span className="text-gray-500">Guests:</span> {booking.guests}</p>
                <p><span className="text-gray-500">Total:</span> ${booking.price}</p>
                <p><span className="text-gray-500">Booked:</span> {new Date(booking.bookedAt).toLocaleDateString()}</p>
                <p><span className="text-gray-500">Departure:</span> {new Date(booking.startDate).toLocaleDateString()}</p>
              </div>
              <div className="mt-3 border-t border-gray-100 pt-3 text-sm dark:border-gray-700">
                <span className="text-gray-500">Assigned guide:</span>{' '}
                <span className="font-semibold">{booking.assignedGuide?.name || 'To be confirmed'}</span>
                {booking.assignedGuide?.role && (
                  <span className="ml-2 text-gray-500">({booking.assignedGuide.role})</span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {booking.status === 'pending' && (
                  <ButtonComponent type="button" variant="outline" onClick={() => openBookingEditor(booking)}>
                    Edit booking
                  </ButtonComponent>
                )}
                {booking.status !== 'cancelled' && (
                  <ButtonComponent type="button" variant="outline" disabled={isCancellingBooking} onClick={() => cancelBooking(booking)} className="border-red-300 text-red-700">
                    {isCancellingBooking ? 'Cancelling…' : 'Cancel booking'}
                  </ButtonComponent>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-layout">
            <h2 className="text-xl font-bold text-primary">Edit booking</h2>
            <p className="mt-2 text-sm">Only pending bookings can be edited.</p>
            <label className="mt-5 block text-sm font-semibold">Guests
              <input type="number" min="1" max={editingBooking.tour.maxGroupSize} value={bookingGuests} onChange={(event) => setBookingGuests(Number(event.target.value))} className="mt-2 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-backgroundDark" />
            </label>
            <label className="mt-4 block text-sm font-semibold">Departure date
              <select value={bookingStartDate} onChange={(event) => setBookingStartDate(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-backgroundDark">
                {editingBooking.tour.startDates.filter((date) => new Date(date).getTime() > Date.now()).map((date) => (
                  <option key={date} value={date}>{new Date(date).toLocaleString()}</option>
                ))}
              </select>
            </label>
            <div className="mt-5 flex justify-end gap-3">
              <ButtonComponent type="button" variant="outline" onClick={() => setEditingBooking(undefined)}>Cancel</ButtonComponent>
              <ButtonComponent type="button" disabled={isUpdatingBooking} onClick={saveBooking} className="bg-primary text-white">{isUpdatingBooking ? 'Saving…' : 'Save changes'}</ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderBillingSection = (): JSX.Element => (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-backgroundDark dark:text-fontDark">
      <h2 className="mb-4 text-xl font-semibold">Billing Information</h2>
      {/* Display billing info here */}
    </div>
  );

  return (
    <div
      className="bg-backgroundLight text-fontLight dark:bg-backgroundDark
     dark:text-fontDark"
    >
      {/* Sidebar Toggle Button */}
      <button
        className="mb-2 ml-1 mt-4 block rounded-lg bg-primary p-2 text-white md:hidden"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <Menu02Icon size={24} />
      </button>

      <div className="flex min-h-[calc(100vh-6.5rem)] gap-x-4 md:flex">
        {/* Sidebar */}
        <aside
          className={`fixed bottom-0 left-0 top-16 z-40 w-64 max-w-48 transform rounded-lg
 bg-white p-4 shadow-md transition-transform dark:bg-neutral-dark md:relative md:top-0 
 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <ul className="space-y-2">
            {isSidebarOpen && (
              <li className="flex justify-end">
                <Cancel02Icon
                  onClick={() => setIsSidebarOpen(false)}
                  className="cursor-pointer"
                />
              </li>
            )}
            {sections.map((section) => (
              <li
                key={section}
                className={`cursor-pointer rounded-lg p-2 ${
                  currentSection === section
                    ? 'bg-primary-active text-white'
                    : 'hover:bg-primary-extraLight'
                }`}
                onClick={() => {
                  setCurrentSection(
                    section as 'settings' | 'bookings' | 'reviews' | 'billing',
                  );
                  setSearchParams(section === 'settings' ? {} : { section });
                  setIsSidebarOpen(false);
                }}
              >
                {section !== 'settings' && section !== 'billing'
                  ? `My ${section.charAt(0).toUpperCase() + section.slice(1)}`
                  : section.charAt(0).toUpperCase() + section.slice(1)}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="min-h-[calc(100vh-6.5rem)] flex-1 md:ml-0">
          {currentSection === 'settings' && <Settings />}
          {isRegularUser && currentSection === 'bookings' && renderBookingsSection()}
          {isRegularUser && currentSection === 'reviews' && <Reviews />}
          {isRegularUser && currentSection === 'billing' && renderBillingSection()}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
