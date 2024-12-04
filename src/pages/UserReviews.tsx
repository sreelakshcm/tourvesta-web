// import { useGetAllReviewsQuery } from '@features/reviews/reviewsApi';
// import React, { useState } from 'react';
// import { Review } from 'types/tourTypes';

// const ReviewsPage: React.FC = () => {
//   const { data } = useGetAllReviewsQuery('');

//   const [reviews, setReviews] = useState<Review[]>(data || []);
//   const [newReview, setNewReview] = useState('');
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editContent, setEditContent] = useState('');

//   const addReview = (): void => {
//     // if (newReview.trim()) {
//     //   setReviews([...reviews, {  review: newReview.trim() }]);
//     //   setNewReview('');
//     // }
//   };

//   const editReview = (id: string, content: string): void => {
//     setEditingId(id);
//     setEditContent(content);
//   };

//   const saveEdit = (): void => {
//     // setReviews(
//     //   reviews.map((r) =>
//     //     r.id === editingId ? { ...r, content: editContent } : r
//     //   )
//     // );
//     setEditingId(null);
//     setEditContent('');
//   };

//   const deleteReview = (id: string): void => {
//     setReviews(reviews.filter((r) => r._id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-backgroundLight p-6 dark:bg-backgroundDark">
//       <h1 className="mb-4 text-2xl font-semibold text-primary dark:text-fontDark">
//         User Reviews
//       </h1>
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Write a review..."
//           value={newReview}
//           onChange={(e) => setNewReview(e.target.value)}
//           className="mb-2 w-full rounded border border-neutral-neutral p-2 
// text-fontLight focus:outline-primary focus:ring focus:ring-primary/50 dark:border-neutral-dark
//  dark:bg-neutral-dark dark:text-fontDark"
//         />
//         <button
//           onClick={addReview}
//           className="rounded bg-primary px-4 py-2 text-white shadow-md hover:bg-primary-hover"
//         >
//           Add Review
//         </button>
//       </div>
//       <ul className="space-y-4">
//         {reviews.map((review) => (
//           <li
//             key={review._id}
//             className="rounded bg-neutral-neutral p-4 shadow-md dark:bg-neutral-dark"
//           >
//             {editingId === review._id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editContent}
//                   onChange={(e) => setEditContent(e.target.value)}
//                   className="mb-2 w-full rounded border border-neutral-neutral p-2 
// text-fontLight focus:outline-primary focus:ring focus:ring-primary/50 
// dark:border-neutral-dark dark:bg-neutral-dark dark:text-fontDark"
//                 />
//                 <div className="flex gap-2">
//                   <button
//                     onClick={saveEdit}
//                     className="rounded bg-primary px-3 py-1 text-white hover:bg-primary-hover"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingId(null)}
//                     className="rounded bg-secondary-light px-3
//  py-1 text-white hover:bg-secondary"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p className="text-fontLight dark:text-fontDark">
//                   {review.review}
//                 </p>
//                 <div className="mt-2 flex gap-2">
//                   <button
//                     onClick={() => editReview(review._id, review.review)}
//                     className="text-secondary hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteReview(review._id)}
//                     className="text-red-500 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReviewsPage;

import { StarIcon } from 'hugeicons-react';
import React, { useState } from 'react';

interface Review {
  id: number;
  review: string;
  rating: number;
  tour: string;
  user: {
    name: string;
  };
}

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      review: 'Amazing experience! Highly recommend.',
      rating: 5,
      tour: 'Grand Canyon Tour',
      user: { name: 'John Doe' },
    },
    {
      id: 2,
      review: 'Great service, but could improve.',
      rating: 4,
      tour: 'Safari Adventure',
      user: { name: 'Jane Smith' },
    },
  ]);
  const [newReview, setNewReview] = useState({
    review: '',
    rating: 0,
    tour: '',
    user: { name: 'Current User' },
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<Review | null>(null);

  const handleRating = (rating: number, isEditing: boolean): void => {
    if (isEditing && editContent) {
      setEditContent({ ...editContent, rating });
    } else {
      setNewReview({ ...newReview, rating });
    }
  };

  const addReview = (): void => {
    if (newReview.review.trim() && newReview.rating > 0) {
      setReviews([...reviews, { ...newReview, id: Date.now() }]);
      setNewReview({
        review: '',
        rating: 0,
        tour: '',
        user: { name: 'Current User' },
      });
    }
  };

  const editReview = (id: number): void => {
    const reviewToEdit = reviews.find((r) => r.id === id);
    if (reviewToEdit) {
      setEditingId(id);
      setEditContent(reviewToEdit);
    }
  };

  const saveEdit = (): void => {
    if (editContent?.review.trim() && editContent.rating > 0) {
      setReviews(
        reviews.map((r) => (r.id === editingId ? { ...editContent } : r)),
      );
      setEditingId(null);
      setEditContent(null);
    }
  };

  const deleteReview = (id: number): void => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-backgroundLight p-6 dark:bg-backgroundDark">
      <h1 className="mb-6 text-center text-3xl font-bold text-primary dark:text-fontDark">
        User Reviews
      </h1>

      {/* Add New Review Section */}
      <div className="mb-8 rounded-lg bg-neutral-neutral p-6 shadow-lg dark:bg-neutral-dark">
        <h2 className="mb-4 text-xl font-semibold text-fontLight dark:text-fontDark">
          Add a Review
        </h2>
        <textarea
          placeholder="Write your review here..."
          value={newReview.review}
          onChange={(e) =>
            setNewReview({ ...newReview, review: e.target.value })
          }
          className="mb-4 w-full rounded border border-neutral-neutral p-3 text-fontLight
 focus:outline-primary focus:ring focus:ring-primary/50 dark:border-neutral-dark
 dark:bg-neutral-dark dark:text-fontDark"
        />
        <div className="mb-4 flex items-center">
          <span className="mr-3 text-fontLight dark:text-fontDark">
            Rating:
          </span>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              size={24}
              className={`cursor-pointer ${
                newReview.rating >= star ? 'text-secondary' : 'text-gray-400'
              }`}
              onClick={() => handleRating(star, false)}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Tour name"
          value={newReview.tour}
          onChange={(e) => setNewReview({ ...newReview, tour: e.target.value })}
          className="mb-4 w-full rounded border border-neutral-neutral p-3 text-fontLight
 focus:outline-primary focus:ring focus:ring-primary/50 dark:border-neutral-dark
 dark:bg-neutral-dark dark:text-fontDark"
        />
        <button
          onClick={addReview}
          className="w-full rounded bg-primary px-4 py-2
 text-white shadow-lg hover:bg-primary-hover"
        >
          Add Review
        </button>
      </div>

      {/* Display Reviews */}
      <ul className="space-y-6">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="rounded-lg bg-neutral-neutral p-6 shadow-lg dark:bg-neutral-dark"
          >
            {editingId === review.id && editContent ? (
              <>
                <textarea
                  value={editContent.review}
                  onChange={(e) =>
                    setEditContent({ ...editContent, review: e.target.value })
                  }
                  className="mb-4 w-full rounded border border-neutral-neutral p-3
 text-fontLight focus:outline-primary focus:ring focus:ring-primary/50
 dark:border-neutral-dark dark:bg-neutral-dark dark:text-fontDark"
                />
                <div className="mb-4 flex items-center">
                  <span className="mr-3 text-fontLight dark:text-fontDark">
                    Rating:
                  </span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      size={24}
                      className={`cursor-pointer ${
                        editContent.rating >= star
                          ? 'text-secondary'
                          : 'text-gray-400'
                      }`}
                      onClick={() => handleRating(star, true)}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  value={editContent.tour}
                  onChange={(e) =>
                    setEditContent({ ...editContent, tour: e.target.value })
                  }
                  className="mb-4 w-full rounded border border-neutral-neutral p-3
 text-fontLight focus:outline-primary focus:ring focus:ring-primary/50
 dark:border-neutral-dark dark:bg-neutral-dark dark:text-fontDark"
                />
                <div className="flex gap-4">
                  <button
                    onClick={saveEdit}
                    className="w-full rounded bg-primary px-4 py-2
 text-white shadow-lg hover:bg-primary-hover"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="w-full rounded bg-secondary-light px-4 py-2
 text-white shadow-lg hover:bg-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-2 text-xl font-semibold text-fontLight dark:text-fontDark">
                  {review.review}
                </p>
                <div className="mb-2 flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      size={20}
                      className={`${
                        review.rating >= star
                          ? 'text-secondary'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-2 text-fontLight dark:text-mutedDark">
                  <strong>Tour:</strong> {review.tour}
                </p>
                <p className="text-fontLight dark:text-mutedDark">
                  <strong>User:</strong> {review.user.name}
                </p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => editReview(review.id)}
                    className="text-secondary hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;
