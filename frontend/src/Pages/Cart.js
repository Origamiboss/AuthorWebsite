import React, { useEffect, useState } from 'react';
import '../StyleSheets/Cart.css';

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
        return <h2 className="cart-empty">Your cart is empty</h2>;
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>

            {cart.map(item => (
                <div key={item.id} className="cart-item">
                    <img src={item.coverImage} alt={item.title} />

                    <div className="cart-info">
                        <h3>{item.title}</h3>
                        <p>${item.price.toFixed(2)}</p>

                        <div className="cart-quantity">
                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>

                        <button
                            className="remove-btn"
                            onClick={() => removeItem(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            <div className="cart-total">
                <h2>Total: ${totalPrice.toFixed(2)}</h2>
                <a href="/checkout" className="checkout-btn">Checkout</a>
            </div>
        </div>
    );
}

export default Cart;
