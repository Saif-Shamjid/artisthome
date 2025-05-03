// ReviewModal.jsx
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const ReviewModal = ({
  activeReview,
  setActiveReview,
  reviewRating,
  setReviewRating,
  reviewText,
  setReviewText,
  submitReview,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md"
      >
        <h3 className="font-serif text-xl text-amber-900 mb-4">
          Write a Review
        </h3>

        <div className="mb-4">
          <label className="block text-amber-800 mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setReviewRating(star)}
                className="text-2xl mr-1"
              >
                <FiStar
                  className={
                    star <= reviewRating
                      ? "text-amber-600 fill-current"
                      : "text-amber-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-amber-800 mb-2">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg h-32"
            placeholder="Share your thoughts about this product..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setActiveReview(null)}
            className="px-4 py-2 border border-amber-200 rounded-full text-amber-800 hover:bg-amber-50"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              submitReview(activeReview.orderId, activeReview.productId)
            }
            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-full"
          >
            Submit Review
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewModal;
