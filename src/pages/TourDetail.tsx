import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  StarIcon,
  TimeQuarterPassIcon,
  UserGroupIcon,
  MountainIcon,
  PinIcon,
  Dollar02Icon,
  Location03Icon,
  DollarSquareIcon,
  Location01Icon,
} from 'hugeicons-react';
import { useGetTourByIdQuery } from '@features/tours/tourApi';
import Loader from '@components/UI/Loader';
import GallerySection from '@components/common/Gallery';
import TourReviews from '@features/tours/components/TourReviews';
import TourMap from '@features/tours/components/TourMap';
import ItineraryTimeline from '@features/tours/components/ItineraryTimeline';
import TourHighlightItem from '@features/tours/components/TourHighlightItem';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { setIsSearch, setSearchQuery } from '@features/UI/navbarSlice';
import { getToken } from '@features/auth/authSlice';
import { useCreateReservationMutation } from '@features/bookings/bookingApi';
import { format } from 'date-fns';

const TourDetailPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: tour, isLoading } = useGetTourByIdQuery(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(getToken);
  const [createReservation, { isLoading: isCreatingReservation }] = useCreateReservationMutation();
  const [paymentError, setPaymentError] = useState<string>();
  const [selectedStartDate, setSelectedStartDate] = useState('');

  useEffect(() => {
    dispatch(setSearchQuery(''));
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(setIsSearch(null));
  }, [dispatch]);

  if (isLoading) return <Loader />;

  if (!tour)
    return (
      <p className="text-center text-lg text-gray-500">Oops! Tour not found.</p>
    );

  const reserveTour = async (): Promise<void> => {
    if (!token) {
      navigate('/auth');
      return;
    }
    try {
      setPaymentError(undefined);
      if (!selectedStartDate) {
        setPaymentError('Please select a departure date before reserving.');
        return;
      }
      await createReservation({ tourId: tour._id, guests: 1, startDate: selectedStartDate }).unwrap();
      navigate('/settings?section=bookings');
    } catch (error) {
      const apiError = error as { data?: { message?: string } };
      setPaymentError(apiError.data?.message || 'Unable to reserve this tour. Please try again.');
    }
  };

  const {
    name,
    imageCover,
    price,
    duration,
    maxGroupSize,
    difficulty,
    startLocation,
    ratingsAverage,
    ratingsQuantity,
    startDates,
    images,
    summary,
    description,
    locations,
    reviews,
  } = tour;
  const upcomingStartDates = startDates.filter((date) => new Date(date).getTime() >= Date.now());

  return (
    <div className="mt-2 bg-gray-50 pb-3 dark:bg-backgroundDark dark:text-gray-100">
      <section
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(/assets/img/tours/${imageCover})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b
 from-black/70 via-black/50 to-transparent"
        ></div>

        {/* Content */}
        <div className="relative z-10 px-6 text-center text-white">
          {/* <span className="mb-4 inline-block animate-pulse rounded-full bg-primary/90 px-4 
                  py-2 text-sm font-medium">
            Limited Slots Available!
          </span> */}
          <h1 className="animate-fadeInDown text-6xl font-extrabold text-white">
            {name}
          </h1>
          <p className="mt-4 max-w-3xl animate-fadeIn text-lg leading-relaxed text-gray-300">
            {summary}
          </p>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/20 bg-white/95 p-4 text-left text-fontLight shadow-2xl backdrop-blur-sm sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <label className="block flex-1 text-sm font-bold">
                <span className="text-primary">1. Choose your departure</span>
                <select
                  value={selectedStartDate}
                  onChange={(event) => {
                    setSelectedStartDate(event.target.value);
                    setPaymentError(undefined);
                  }}
                  disabled={upcomingStartDates.length === 0}
                  className="mt-2 block w-full rounded-xl border border-gray-200 bg-white p-3.5 font-medium text-fontLight outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  <option value="">{upcomingStartDates.length ? 'Select a date' : 'No upcoming departures'}</option>
                  {upcomingStartDates.map((date) => (
                    <option key={date} value={date}>{format(new Date(date), 'EEEE, MMMM d, yyyy')}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={reserveTour}
                disabled={isCreatingReservation || upcomingStartDates.length === 0}
                className="min-h-14 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-primary-hover hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 sm:min-w-52"
              >
                {isCreatingReservation ? 'Reserving your spot…' : 'Reserve your spot'}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-100 pt-3 text-xs font-medium text-gray-600">
              <span>${price} per traveller</span>
              <span>✓ No payment today</span>
              <span>✓ Free cancellation until 24 hours before departure</span>
            </div>
            {paymentError && (
              <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                {paymentError}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-12 space-y-12 px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <aside className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-dark">
            <h2 className="text-xl font-bold">Tour Highlights</h2>
            <ul className="mt-6 space-y-4">
              <TourHighlightItem
                icon={<Dollar02Icon />}
                label={`$${price} / person`}
              />
              <TourHighlightItem
                icon={<MountainIcon />}
                label={`Difficulty - ${difficulty}`}
              />
              <TourHighlightItem
                icon={<UserGroupIcon />}
                label={`${maxGroupSize} people`}
              />
              <TourHighlightItem
                icon={<PinIcon />}
                label={`${startLocation.description}`}
              />
              <TourHighlightItem
                icon={<Location01Icon />}
                label={`Locations - ${locations.length}`}
              />
              <TourHighlightItem
                icon={<StarIcon />}
                label={`${ratingsAverage} (${ratingsQuantity} reviews)`}
              />
            </ul>
            <button
              type="button"
              onClick={reserveTour}
              disabled={isCreatingReservation || upcomingStartDates.length === 0}
              className="mt-6 w-full rounded-lg bg-primary px-4 py-2 text-white shadow-lg"
            >
              {isCreatingReservation ? 'Creating reservation…' : 'Reserve your spot'}
            </button>
            {upcomingStartDates.length === 0 && <p className="mt-3 text-sm text-amber-700 dark:text-amber-300">This tour does not currently have an upcoming departure.</p>}
          </aside>
          <main className="space-y-12 lg:col-span-2">
            <section>
              <h2 className="text-2xl font-bold">About the Tour</h2>
              <p className="mt-4">{description}</p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl font-bold">Key Highlights</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  className="flex items-start rounded-xl bg-white p-6 
shadow-md transition-shadow hover:shadow-lg dark:bg-neutral-dark"
                >
                  <div className="rounded-lg text-primary">
                    <DollarSquareIcon size={28} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Price</h3>
                    <p className="capitalize text-gray-600 dark:text-gray-300">
                      ${price}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start rounded-xl bg-white p-6 shadow-md 
transition-shadow hover:shadow-lg dark:bg-neutral-dark"
                >
                  <div className="rounded-lg text-primary">
                    <TimeQuarterPassIcon size={28} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Duration</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {duration} days
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start rounded-xl bg-white p-6 shadow-md 
transition-shadow hover:shadow-lg dark:bg-neutral-dark"
                >
                  <div className="rounded-lg text-primary">
                    <Location03Icon size={28} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {startLocation.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>

        <section className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Itinerary</h2>
            <ItineraryTimeline locations={locations} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Locations</h2>
            <TourMap locations={locations} />
          </div>
        </section>

        <GallerySection images={images} />

        <TourReviews reviews={reviews} />
      </div>
    </div>
  );
};

export default TourDetailPage;
