import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../StyleSheets/Store.css';

function Store() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/books`);
            setProducts(res.data);
        } catch (err) {
            console.error('Failed to fetch products', err);
        }
    };



    return (
        <div className="store-page">
            <h1>Book Store</h1>

            <div className="store-grid">
                {products.map(product => (
                    <div className="store-card" key={product.id}>
                        <img
                            src={product.coverImage}
                            alt={product.title}
                            className="store-image"
                        />

                        <h2>{product.title}</h2>
                        <p className="store-price">${product.cost?.toFixed(2) ?? '19.99'}</p>

                        <button
                            className="store-button"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Store;