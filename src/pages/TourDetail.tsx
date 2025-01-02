import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { useGetTourByIdQuery } from '@services/tourApi';
import Loader from '@components/UI/Loader';
import GallerySection from '@components/common/Gallery';
import TourReviews from '@features/tours/components/TourReviews';
import TourMap from '@features/tours/components/TourMap';
import ItineraryTimeline from '@features/tours/components/ItineraryTimeline';
import TourHighlightItem from '@features/tours/components/TourHighlightItem';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { setIsSearch, setSearchQuery } from '@slices/navbarSlice';
import NoData from '@components/common/Illustrations/NoData';
import { getErrors } from '@actions/themeToggleAction';
import UnauthorizedPage from '@components/common/Illustrations/UnAuthorizedPage';

const TourDetailPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: tour, isLoading, isFetching } = useGetTourByIdQuery(id);
  const globalError = useAppSelector(getErrors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(''));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsSearch(null));
  }, [dispatch]);

  if (isLoading) return <Loader />;

  if (
    globalError.isError &&
    (globalError.errorStatus === 401 || globalError.errorStatus === 500)
  )
    return <UnauthorizedPage />;

  if (!tour && (!isLoading || !isFetching)) return <NoData label="Tour" />;

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
    images,
    summary,
    description,
    locations,
    reviews,
  } = tour || {};

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
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <button
              className="transform rounded-lg bg-primary px-8 py-3 text-lg font-semibold
 text-white shadow-lg transition-transform hover:scale-110 hover:bg-primary-hover hover:shadow-2xl"
            >
              Book Now
            </button>
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
                label={`${startLocation?.description}`}
              />
              <TourHighlightItem
                icon={<Location01Icon />}
                label={`Locations - ${locations?.length}`}
              />
              <TourHighlightItem
                icon={<StarIcon />}
                label={`${ratingsAverage} (${ratingsQuantity} reviews)`}
              />
            </ul>
            <button className="mt-6 w-full rounded-lg bg-primary px-4 py-2 text-white shadow-lg">
              Reserve Your Spot
            </button>
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
                      {startLocation?.description}
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
            <ItineraryTimeline locations={locations || []} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Locations</h2>
            <TourMap locations={locations || []} />
          </div>
        </section>

        <GallerySection images={images || []} />

        <TourReviews reviews={reviews} />
      </div>
    </div>
  );
};

export default TourDetailPage;
