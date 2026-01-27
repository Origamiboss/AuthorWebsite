import { motion } from "framer-motion";

function ReviewSlide({ review }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl bg-white p-8 rounded-xl shadow-lg text-center"
        >
            <h4 className="text-3xl italic line-clamp-4">
                “{review.comment}”
            </h4>
            <h5 className="text-xl text-text mt-4">
                – {review.reviewerName}
            </h5>
            <p className="text-lg text-muted mt-2">
                {review.rating} / 10
            </p>
        </motion.div>
    );
}

export default ReviewSlide;
