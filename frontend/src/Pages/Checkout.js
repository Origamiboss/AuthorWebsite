import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../StyleSheets/Checkout.css';

function Checkout() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const paypalRef = useRef(); // ref to PayPal container

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        const totalPrice = storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(totalPrice);
    }, []);

    useEffect(() => {
        if (cart.length === 0) return; // don't render if cart is empty

        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=USD`;
        script.async = true;

        script.onload = () => {
            if (paypalRef.current) { // ensure container exists
                window.paypal.Buttons({
                    createOrder: async () => {
                        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/paypal/create-order`, { cart });
                        return res.data.id;
                    },
                    onApprove: async (data) => {
                        await axios.post(`${process.env.REACT_APP_API_URL}/api/paypal/capture-order`, { orderID: data.orderID });
                        alert('Payment completed!');
                    },
                    onError: (err) => console.error('PayPal button error', err)
                }).render(paypalRef.current);
            }
        };

        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, [cart]);

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <div>Total: ${total.toFixed(2)}</div>
            <div className="checkout-paypal" ref={paypalRef} /> {/* use ref instead of id */}
        </div>
    );
}

export default Checkout;
