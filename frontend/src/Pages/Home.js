import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../StyleSheets/Home.css'; // your slideshow CSS

function Home() {
    const [slides, setSlides] = useState([]);
    const [books, setBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch slides and books from backend
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/events`)
            .then(res => setSlides(res.data))
            .catch(err => console.error(err));

        axios.get(`${process.env.REACT_APP_API_URL}/api/books`)
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
    }, []);

    // Slideshow controls
    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    };

    const setSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div>
            {/* Only render slideshow if slides exist */}
            {slides.length > 0 && (
                <>
                    <div className="slideshow-container">
                        <img
                            src={slides[currentIndex].imageUrl}
                            alt={slides[currentIndex].title}
                        />
                        <span className="prev" onClick={prevSlide}>&#10094;</span>
                        <span className="next" onClick={nextSlide}>&#10095;</span>
                    </div>

                    <div className="dot-container">
                        {slides.map((slide, index) => (
                            <span
                                key={slide.id}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setSlide(index)}
                            ></span>
                        ))}
                    </div>
                </>
            )}

            {/* Books section */}
            <center>
                <div className="popular-books">
                    {books.map(book => (
                        <Link
                            key={book.id}
                            to={`/books/${book.id}`}
                            className="book-link"
                        >
                            <div className="book-home-card">
                                <img src={book.coverImage} alt={book.title} />
                                <h3>{book.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </center>
        </div>
    );
}

export default Home;
