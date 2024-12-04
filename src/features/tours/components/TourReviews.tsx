import { StarIcon } from 'hugeicons-react';
import { FC } from 'react';
import { Review } from 'types/tourTypes';

const TourReviews: FC<{ reviews?: Review[] }> = ({ reviews }) => {
  return (
    <section>
      <h2 className="text-3xl font-bold">Reviews</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews?.map((review) => (
          <div
            key={review._id}
            className="flex flex-col rounded-xl bg-white p-6 shadow-lg 
transition-shadow hover:shadow-xl dark:bg-neutral-dark"
          >
            {/* Card Header */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full
bg-gray-200 text-lg font-bold text-gray-500 dark:bg-gray-700 dark:text-gray-300"
              >
                {review.user.name.charAt(0).toUpperCase()}
              </div>
              {/* User Info */}
              <div>
                <p className="text-lg font-semibold">{review.user.name}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      size={20}
                      className={
                        i < review.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Review Text */}
            <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
              {review.review.length > 150
                ? review.review.slice(0, 150) + '...'
                : review.review}
              {review.review.length > 150 && (
                <span className="cursor-pointer font-medium text-primary">
                  {' '}
                  Read more
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourReviews;
