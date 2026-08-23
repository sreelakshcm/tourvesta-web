import { useAppDispatch } from '@app/hooks';
import StarSvg from '@assets/svg/StarSvg';
import AlertContainer from '@components/UI/AlertContainer';
import NoData from '@components/common/Illustrations/NoData';
import Loader from '@components/UI/Loader';
import {
  useDeleteReviewMutation,
  useGetMyReviewsQuery,
  useUpdateReviewMutation,
} from '@features/reviews/reviewsApi';
import { setSuccess } from '@features/UI/themeToggleSlice';
import { StarIcon } from 'hugeicons-react';
import { FC, useState } from 'react';

type EditingReview = { id: string; rating: number; review: string };

const Reviews: FC = () => {
  const dispatch = useAppDispatch();
  const { data: reviews, isLoading } = useGetMyReviewsQuery();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const [editingReview, setEditingReview] = useState<EditingReview | null>(null);
  const [reviewToRemove, setReviewToRemove] = useState<string | null>(null);

  const saveReview = async (): Promise<void> => {
    if (!editingReview || !editingReview.rating || !editingReview.review.trim()) return;
    await updateReview({ ...editingReview, review: editingReview.review.trim() }).unwrap();
    setEditingReview(null);
    dispatch(setSuccess({ isSuccess: true, successMessage: 'Review updated successfully.' }));
  };

  const removeReview = async (): Promise<void> => {
    if (!reviewToRemove) return;
    await deleteReview(reviewToRemove).unwrap();
    setReviewToRemove(null);
    dispatch(setSuccess({ isSuccess: true, successMessage: 'Review deleted successfully.' }));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="h-full overflow-auto rounded-lg p-4 shadow-md sm:p-6 md:bg-backgroundLight md:dark:bg-neutral-layout lg:p-8">
      <h2 className="mb-4 text-center text-xl font-bold text-primary sm:text-2xl">
        My Reviews
      </h2>
      {reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="transform rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-[1.05] hover:shadow-lg dark:bg-neutral-900 sm:p-6"
            >
              <div className="flex h-full flex-col">
                {editingReview?.id === review.id ? (
                  <>
                    <div className="mb-3 flex gap-1 text-yellow-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`Rate ${star} out of 5`}
                          onClick={() => setEditingReview({ ...editingReview, rating: star })}
                        >
                          <StarIcon
                            size={22}
                            className={star <= editingReview.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={editingReview.review}
                      onChange={(event) => setEditingReview({ ...editingReview, review: event.target.value })}
                      maxLength={500}
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm text-fontLight outline-none focus:border-primary dark:border-gray-600 dark:bg-neutral-dark dark:text-fontDark"
                    />
                    <div className="mt-3 flex gap-3 text-sm font-semibold">
                      <button type="button" disabled={isUpdating} onClick={saveReview} className="text-primary hover:text-primary-hover disabled:opacity-50">
                        {isUpdating ? 'Saving...' : 'Save'}
                      </button>
                      <button type="button" onClick={() => setEditingReview(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300">Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-2 flex text-yellow-500 sm:mb-4"><StarSvg rating={review.rating} /></div>
                    <p className="mb-2 flex-grow text-sm font-medium text-gray-700 dark:text-gray-200 sm:mb-4 sm:text-base lg:text-lg">{review.review}</p>
                    <p className="mb-2 text-xs font-semibold text-primary sm:text-sm">
                      {typeof review.tour === 'string' ? 'Tour review' : review.tour.name}
                    </p>
                    <p className="mt-auto text-xs text-gray-500 dark:text-gray-400 sm:text-sm lg:text-base">
                      Reviewed on {new Date(review.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                    <div className="mt-3 flex gap-3 text-sm font-semibold">
                      <button
                        type="button"
                        onClick={() => setEditingReview({ id: review.id, rating: review.rating, review: review.review })}
                        className="text-primary hover:text-primary-hover"
                      >Edit</button>
                      <button type="button" onClick={() => setReviewToRemove(review.id)} className="text-red-600 hover:text-red-700">Remove</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : <NoData />}
      <AlertContainer
        isOpen={Boolean(reviewToRemove)}
        title="Remove review?"
        message="This review will be permanently deleted and cannot be recovered."
        confirmLabel="Remove review"
        isConfirming={isDeleting}
        onConfirm={removeReview}
        onCancel={() => setReviewToRemove(null)}
      />
    </div>
  );
};

export default Reviews;
