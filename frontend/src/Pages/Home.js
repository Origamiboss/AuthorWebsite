import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import Slide from "../Extra/slide";
import ReviewSlide from "../Extra/review";
import axios from 'axios';

function Home() {
    const [slides, setSlides] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch books and reviews
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/slides`)
            .then(res => setSlides(res.data))
            .catch(err => console.error(err));

        axios.get(`${process.env.REACT_APP_API_URL}/api/reviews`)
            .then(res => setReviews(res.data))
            .catch(err => console.error(err));
    }, []);

    const combinedItems = React.useMemo(() => {
        const result = [];
        const currentBookId = slides.length > 0 ? slides[0].bookId : null;
        if (!currentBookId) return result;

        const filteredSlides = slides.filter(slide => slide.bookId === currentBookId);
        const filteredReviews = reviews.filter(review => review.bookId === currentBookId);

        const maxLength = Math.max(filteredSlides.length, filteredReviews.length);

        for (let i = 0; i < maxLength; i++) {
            if (filteredSlides[i]) result.push({ type: "slide", data: filteredSlides[i] });
            if (filteredReviews[i]) result.push({ type: "review", data: filteredReviews[i] });
        }

        return result;
    }, [slides, reviews]);




    const currentSlide = slides[currentIndex];
    const currentReviews = reviews.filter(
        review => review.bookId === currentSlide.bookId
    );

    const next = () =>
        setCurrentIndex((prev) => (prev + 1) % slides.length);

    const prev = () =>
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="flex flex-col">

            {/* Slideshow */}
            {slides.length > 0 && (
                <div className="w-full h-[700px] md:h-[800px] flex justify-center items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <Slide
                            key={currentSlide.id}
                            slide={currentSlide}
                        />
                    </AnimatePresence>

                    {/* Controls */}
                    <span
                        onClick={prev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-slide-btn text-text p-3 rounded-full cursor-pointer hover:bg-slide-btn-hover"
                    >
                        &#10094;
                    </span>

                    <span
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-slide-btn text-text p-3 rounded-full cursor-pointer hover:bg-slide-btn-hover"
                    >
                        &#10095;
                    </span>
                </div>
            )}

            {/* REVIEW SECTION (SYNCED TO CURRENT SLIDE) */}
            {currentReviews.length > 0 && (
                <div className="bg-candy mt-16 py-12 flex justify-center">
                    <AnimatePresence mode="wait">
                        {currentReviews.map(review => (
                            <ReviewSlide
                                key={review.id}
                                review={review}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}


            {/* Newsletter */}
            <div className="my-16 mx-auto px-8 py-10 bg-viridiam rounded-2xl text-center shadow-lg max-w-3xl">
                <p className="text-text text-lg md:text-xl mb-8 leading-relaxed">
                    Join my newsletter and get all the latest updates on upcoming books and events right in your inbox!
                </p>
                <Link
                    to="/newsletter"
                    className="inline-block px-6 py-3 bg-link text-text font-medium text-lg rounded-full shadow-md hover:bg-link-hover transform hover:-translate-y-1 transition-all duration-200"
                >
                    Subscribe Now
                </Link>
            </div>

        </div>
    );
}

export default Home;
