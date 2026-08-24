import { useAppDispatch, useAppSelector } from '@app/hooks';
import ButtonComponent from '@components/UI/Button';
import AlertContainer from '@components/UI/AlertContainer';
import Loader from '@components/UI/Loader';
import { getToken, getUserData } from '@features/auth/authSlice';
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useGetMyReviewsQuery,
  useUpdateReviewMutation,
} from '@features/reviews/reviewsApi';
import { useGetAllToursQuery } from '@features/tours/tourApi';
import { setSuccess } from '@features/UI/themeToggleSlice';
import { StarIcon } from 'hugeicons-react';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Review } from 'types/tourTypes';

const getTourName = (tour: Review['tour']): string =>
  typeof tour === 'string' ? 'Tour review' : tour.name;

const RatingStars: FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <StarIcon
        key={star}
        size={18}
        className={
          star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }
      />
    ))}
  </div>
);

const UserReviews: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getToken);
  const user = useAppSelector(getUserData);
  const isCustomer = user?.role === 'user';
  const isModerator = user?.role === 'admin';
  const isGuide = user?.role === 'guide' || user?.role === 'lead-guide';
  const [draft, setDraft] = useState({ tour: '', rating: 0, review: '' });
  const [editingReview, setEditingReview] = useState<{
    id: string;
    rating: number;
    review: string;
  } | null>(null);
  const [reviewToRemove, setReviewToRemove] = useState<string | null>(null);
  const { data: reviews = [], isLoading } = useGetAllReviewsQuery('', {
    skip: !token,
  });
  const { data: myReviews = [] } = useGetMyReviewsQuery(undefined, {
    skip: !isCustomer,
  });
  const { data: tours = [] } = useGetAllToursQuery('', { skip: !isCustomer });
  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const reviewedTourIds = new Set(
    myReviews.map((review) =>
      typeof review.tour === 'string' ? review.tour : review.tour._id || review.tour.id,
    ),
  );
  const myReviewIds = new Set(myReviews.map((review) => review.id));

  const submitReview = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!draft.tour || !draft.rating || !draft.review.trim()) return;

    await createReview({ ...draft, review: draft.review.trim() }).unwrap();
    setDraft({ tour: '', rating: 0, review: '' });
    dispatch(
      setSuccess({
        isSuccess: true,
        successMessage: 'Review published successfully!',
      }),
    );
  };

  const removeReview = async (id: string): Promise<void> => {
    await deleteReview(id).unwrap();
    setReviewToRemove(null);
    dispatch(
      setSuccess({
        isSuccess: true,
        successMessage: 'Review deleted successfully.',
      }),
    );
  };

  const saveReview = async (): Promise<void> => {
    if (!editingReview || !editingReview.rating || !editingReview.review.trim()) return;

    await updateReview({
      ...editingReview,
      review: editingReview.review.trim(),
    }).unwrap();
    setEditingReview(null);
    dispatch(
      setSuccess({
        isSuccess: true,
        successMessage: 'Review updated successfully.',
      }),
    );
  };

  if (!token) {
    return (
      <div className="min-h-[calc(100vh-6.5rem)] bg-backgroundLight p-6 dark:bg-backgroundDark">
        <div className="mx-auto max-w-xl rounded-xl bg-white p-8 text-center shadow-lg dark:bg-neutral-layout">
          <h1 className="text-2xl font-bold text-primary">Tour reviews</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Log in to read and share tour experiences.
          </p>
          <Link
            to="/auth"
            className="mt-6 inline-block rounded-lg bg-primary px-5 py-2 font-semibold text-white hover:bg-primary-hover"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-6.5rem)] bg-backgroundLight p-4 text-fontLight dark:bg-backgroundDark dark:text-fontDark md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-xl bg-gradient-to-r from-primary to-primary-hover p-6 text-white shadow-lg md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Community feedback
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Tour reviews</h1>
          <p className="mt-2 max-w-2xl text-white/90">
            {isModerator
              ? 'Review community feedback and remove content that violates your standards.'
              : isGuide
                ? 'Read what guests loved about their tours. Reviewer identities are kept private.'
                : 'Share your experience and discover feedback from fellow travellers.'}
          </p>
        </header>

        {isCustomer && (
          <section className="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-layout md:p-8">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-primary">Write a review</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                You can submit one review for each tour.
              </p>
            </div>
            <form onSubmit={submitReview} className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium">
                Tour
                <select
                  value={draft.tour}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    setDraft({ ...draft, tour: event.target.value })
                  }
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-fontLight outline-none focus:border-primary dark:border-gray-600 dark:bg-neutral-dark dark:text-fontDark"
                >
                  <option value="">Select a tour</option>
                  {tours.map((tour) => (
                    <option
                      key={tour._id}
                      value={tour._id}
                      disabled={reviewedTourIds.has(tour._id)}
                    >
                      {tour.name}
                      {reviewedTourIds.has(tour._id) ? ' (reviewed)' : ''}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset className="text-sm font-medium">
                <legend>Rating</legend>
                <div className="mt-3 flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} out of 5`}
                      onClick={() => setDraft({ ...draft, rating: star })}
                    >
                      <StarIcon
                        size={28}
                        className={
                          star <= draft.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }
                      />
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="text-sm font-medium md:col-span-2">
                Your experience
                <textarea
                  value={draft.review}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setDraft({ ...draft, review: event.target.value })
                  }
                  required
                  maxLength={500}
                  rows={5}
                  placeholder="Tell travellers what stood out..."
                  className="mt-2 w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-fontLight outline-none focus:border-primary dark:border-gray-600 dark:bg-neutral-dark dark:text-fontDark"
                />
                <span className="mt-1 block text-right text-xs text-gray-500">
                  {draft.review.length}/500
                </span>
              </label>
              <div className="md:col-span-2 md:flex md:justify-end">
                <ButtonComponent
                  type="submit"
                  disabled={isCreating}
                  className="w-full bg-primary px-6 py-3 text-white hover:bg-primary-hover md:w-auto"
                >
                  {isCreating ? 'Publishing...' : 'Publish review'}
                </ButtonComponent>
              </div>
            </form>
          </section>
        )}

        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">Traveller feedback</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : reviews.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow-lg dark:bg-neutral-layout">
              <p className="text-gray-600 dark:text-gray-300">
                No reviews yet. Be the first to share an experience.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="flex min-h-64 flex-col rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-neutral-layout"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {getTourName(review.tour)}
                      </p>
                      {!isGuide && review.user?.name && (
                        <p className="mt-2 font-semibold">{review.user.name}</p>
                      )}
                    </div>
                    <RatingStars rating={review.rating} />
                  </div>
                  {editingReview?.id === review.id ? (
                    <div className="mt-5 flex-1">
                      <textarea
                        value={editingReview.review}
                        onChange={(event) =>
                          setEditingReview({
                            ...editingReview,
                            review: event.target.value,
                          })
                        }
                        maxLength={500}
                        rows={4}
                        className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-fontLight outline-none focus:border-primary dark:border-gray-600 dark:bg-neutral-dark dark:text-fontDark"
                      />
                      <div className="mt-3 flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            aria-label={`Rate ${star} out of 5`}
                            onClick={() => setEditingReview({ ...editingReview, rating: star })}
                          >
                            <StarIcon
                              size={24}
                              className={
                                star <= editingReview.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-5 flex-1 leading-relaxed text-gray-700 dark:text-gray-200">
                      {review.review}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    <span>
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : 'Recent'}
                    </span>
                    <div className="flex items-center gap-3">
                      {myReviewIds.has(review.id) && editingReview?.id !== review.id && (
                        <button
                          type="button"
                          onClick={() =>
                            setEditingReview({
                              id: review.id,
                              rating: review.rating,
                              review: review.review,
                            })
                          }
                          className="font-semibold text-primary hover:text-primary-hover"
                        >
                          Edit
                        </button>
                      )}
                      {editingReview?.id === review.id && (
                        <>
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={saveReview}
                            className="font-semibold text-primary hover:text-primary-hover disabled:opacity-50"
                          >
                            {isUpdating ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingReview(null)}
                            className="font-semibold text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {(isModerator || myReviewIds.has(review.id)) && (
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => setReviewToRemove(review.id)}
                          className="font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
                        >
                          {isDeleting ? 'Deleting...' : 'Remove'}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
      <AlertContainer
        isOpen={Boolean(reviewToRemove)}
        title="Remove review?"
        message="This review will be permanently deleted and cannot be recovered."
        confirmLabel="Remove review"
        isConfirming={isDeleting}
        onConfirm={() => reviewToRemove && removeReview(reviewToRemove)}
        onCancel={() => setReviewToRemove(null)}
      />
    </div>
  );
};

export default UserReviews;
