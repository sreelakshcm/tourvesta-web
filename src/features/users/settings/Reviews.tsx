import { useAppSelector } from '@app/hooks';
import StarSvg from '@assets/svg/StarSvg';
import NoData from '@components/common/Illustrations/NoData';
import Loader from '@components/UI/Loader';
import { getUserData } from '@features/auth/authSlice';
import { useGetReviewByUserIdQuery } from '@features/reviews/reviewsApi';
import { FC } from 'react';

const Reviews: FC = () => {
  const { id = '' } = useAppSelector(getUserData) || {};
  const { data: reviews, isLoading } = useGetReviewByUserIdQuery(id);

  if (isLoading) return <Loader />;

  return (
    <div
      className="h-full overflow-auto rounded-lg p-4 shadow-md sm:p-6 md:bg-backgroundLight 
  md:dark:bg-neutral-layout lg:p-8"
    >
      <h2 className="mb-4 text-center text-xl font-bold text-primary sm:text-2xl">
        My Reviews
      </h2>
      {reviews && reviews?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="transform rounded-lg bg-white p-4 
           shadow-md transition-transform hover:scale-[1.05] hover:shadow-lg
 dark:bg-neutral-900 sm:p-6"
            >
              <div className="flex h-full flex-col">
                {/* Star Rating */}
                <div className="mb-2 flex text-yellow-500 sm:mb-4">
                  <StarSvg rating={review.rating} />
                </div>
         
                {/* Review Text */}
                <p className="mb-2 flex-grow text-sm font-medium text-gray-700 
               dark:text-gray-200 sm:mb-4 sm:text-base lg:text-lg">
                  {review.review}
                </p>
         
                {/* Reviewed Date */}
                <p className="mt-auto text-xs text-gray-500 dark:text-gray-400 
sm:text-sm lg:text-base">
               Reviewed on{' '}
                  {new Date(review.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Reviews;
