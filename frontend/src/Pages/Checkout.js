import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Checkout() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const paypalRef = useRef(null);
    const buttonsRef = useRef(null);
    const [sdkReady, setSdkReady] = useState(false);

    // Load cart
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        setTotal(storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }, []);

    // Load PayPal SDK
    useEffect(() => {
        if (window.paypal) {
            setSdkReady(true);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=USD`;
        script.id = 'paypal-sdk';
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);

        return () => {
            // Optional cleanup: do NOT remove the SDK in dev mode, prevents reloading issues
        };
    }, []);

    // Initialize PayPal buttons once, safely
    useEffect(() => {
        if (!sdkReady || !window.paypal || !paypalRef.current) return;
        if (buttonsRef.current) return; // Already initialized

        // Only render buttons if cart has items
        if (cart.length === 0) return;

        buttonsRef.current = window.paypal.Buttons({
            style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay', tagline: false },
            createOrder: async () => {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/paypal/create-order`, { cart });
                return res.data.id;
            },
            onApprove: async (data) => {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/paypal/capture-order`, { orderID: data.orderID });
                alert('Payment completed!');
                localStorage.removeItem('cart');
                setCart([]);
                setTotal(0);
            },
            onError: (err) => console.error('PayPal Buttons Error:', err),
        });

        buttonsRef.current.render(paypalRef.current);

        // Only close buttons on unmount
        return () => buttonsRef.current?.close();
    }, [sdkReady, cart]);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-bg p-6">
                <div className="bg-sandstone text-text p-8 rounded-xl shadow-lg text-center max-w-md">
                    <h1 className="text-2xl font-bold mb-4 text-heather">Your cart is empty</h1>
                    <p>Add some items before checking out.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-start bg-bg p-6 md:p-10">
            <div className="w-full max-w-2xl bg-sandstone rounded-xl shadow-lg p-6 md:p-10 flex flex-col items-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-heather text-center">Checkout</h1>
                <div className="text-2xl md:text-3xl font-semibold text-text mb-8">Total: ${total.toFixed(2)}</div>

                <div className="w-full flex flex-col gap-4 mb-8">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-md">
                            <div className="flex items-center gap-4">
                                <img src={item.coverImage} alt={item.title} className="w-16 h-20 object-cover rounded-md" />
                                <div>
                                    <h3 className="font-semibold text-text">{item.title}</h3>
                                    <p className="text-text">${item.price.toFixed(2)} x {item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full flex justify-center">
                    <div ref={paypalRef} className="w-full max-w-xs" />
                </div>
            </div>
        </div>
    );
}

export default Checkout;
