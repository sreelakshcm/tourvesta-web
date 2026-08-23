import { format, parseISO } from 'date-fns';
import {
  Calendar03Icon,
  UserGroupIcon,
  StarIcon,
  Location03Icon,
  TimeQuarterPassIcon,
} from 'hugeicons-react';
import { TOURS } from '@constants/services';
import { PRIMARY_COLOR } from '@constants/styles';
import { FC } from 'react';
import { Tour } from 'types/tourTypes';
import { useNavigate } from 'react-router-dom';

const TourCard: FC<{ tours: Tour[] }> = ({ tours }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 lg:grid-cols-3">
      {tours?.map((tour) => (
        <div
          key={tour._id}
          onClick={() => navigate(`${TOURS}/detail/${tour._id}`)}
          className="transform cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg 
transition-shadow hover:scale-105 hover:shadow-xl dark:bg-neutral-dark dark:hover:scale-105"
        >
          <img
            src={`/assets/img/tours/${tour.imageCover}`}
            alt={tour.name}
            className="h-64 w-full rounded-t-xl object-cover"
          />
          <div className="space-y-4 p-6">
            {/* Tour Name */}
            <h2 className="text-2xl font-semibold text-fontLight dark:text-fontDark">
              {tour.name}
            </h2>

            {/* Tour Summary */}
            <p className="text-sm text-gray-500 dark:text-mutedDark">
              {tour.summary}
            </p>

            {/* Reviews Section */}
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex items-center text-sm text-fontLight dark:text-fontDark">
                <StarIcon size={18} color={PRIMARY_COLOR} />
                <span className="ml-2 font-semibold">
                  {tour.ratingsAverage}
                </span>
                <span className="ml-1 text-xs">
                  ({tour.ratingsQuantity} reviews)
                </span>
              </div>
            </div>

            {/* Ratings, Duration & Group Size */}
            <div className="flex flex-wrap gap-4 text-sm text-fontLight dark:text-fontDark">
              <div className="flex items-center">
                <TimeQuarterPassIcon size={18} color={PRIMARY_COLOR} />
                <span className="ml-2">{tour.duration} days</span>
              </div>
              <div className="flex items-center">
                <UserGroupIcon size={18} color={PRIMARY_COLOR} />
                <span className="ml-2">{tour.maxGroupSize} people</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-sm dark:text-mutedDark">
              <Location03Icon size={18} color={PRIMARY_COLOR} />
              <span className="ml-2">{tour.startLocation.description}</span>
            </div>

            {/* Tour Dates */}
            <div className="flex items-center text-sm dark:text-mutedDark">
              <Calendar03Icon size={18} color={PRIMARY_COLOR} />
              <span className="ml-2">
                {tour.startDates
                  .map((date) => format(parseISO(date), 'MMM yyyy'))
                  .join(', ')}
              </span>
            </div>

            {/* Pricing & Book Button */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-secondary">
                ${tour.price} <span className="text-sm">/ person</span>
              </span>
              <button
                className="rounded-lg bg-primary px-4 py-2 text-white shadow-md 
transition-all duration-300 ease-in-out hover:bg-primary-hover
 focus:bg-primary-focus active:bg-primary-active"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourCard;
