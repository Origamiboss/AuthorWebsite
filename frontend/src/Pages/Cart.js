import React, { useEffect, useState } from 'react';

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateQuantity = (id, amount) => {
        const updatedCart = cart.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="flex justify-center items-center bg-bg p-6">
                <h2 className="text-center text-xl md:text-2xl font-semibold text-text bg-white p-6 rounded-lg shadow-md max-w-md">
                    Your cart is empty
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg p-6 md:p-10 flex justify-center">
            <div className="w-full max-w-3xl bg-bg rounded-xl shadow-md p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-header">Your Cart</h1>

                {cart.map(item => (
                    <div
                        key={item.id}
                        className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start border-b border-muted pb-4 mb-4"
                    >
                        <img
                            src={item.coverImage}
                            alt={item.title}
                            className="w-24 h-32 object-cover rounded-lg"
                        />

                        <div className="flex-1 flex flex-col gap-2 w-full">
                            <h3 className="text-lg font-semibold text-header">{item.title}</h3>
                            <p className="text-text font-medium">${item.price.toFixed(2)}</p>

                            {/* Quantity controls */}
                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="px-3 py-1 bg-secondary text-white rounded-md hover:bg-secondary-soft transition"
                                >
                                    -
                                </button>
                                <span className="px-2">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="px-3 py-1 bg-secondary text-white rounded-md hover:bg-secondary-soft transition"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => removeItem(item.id)}
                                className="mt-3 px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-soft transition w-fit"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                {/* Total and Checkout */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                    <h2 className="text-xl font-semibold text-header mb-4 md:mb-0">
                        Total: ${totalPrice.toFixed(2)}
                    </h2>
                    <a
                        href="/checkout"
                        className="px-6 py-3 bg-link text-white font-semibold rounded-full shadow-md hover:bg-link-hover transition"
                    >
                        Checkout
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Cart;
