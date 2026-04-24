// routes/paypal.js
import express from 'express';
import { pool } from '../utils/db.js';
import { checkoutNodeJssdk, paypalClient } from '../utils/paypal.js'; // <- match the export

const router = express.Router();

// sanity test
router.get('/test', (req, res) => {
    res.send('PayPal route works');
});

// Create order
router.post('/create-order', async (req, res) => {
    try {
        console.log('Create order request body:', req.body);
        const { cart } = req.body;

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const request = new checkoutNodeJssdk.orders.OrdersCreateRequest(); // <- note use checkoutNodeJssdk
        request.prefer('return=representation');
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: total.toFixed(2),
                    },
                },
            ],
        });

        const order = await paypalClient.execute(request); // <- use paypalClient
        res.json({ id: order.result.id });
    } catch (err) {
        console.error('Create order error:', err);
        res.status(500).json({ error: 'PayPal order creation failed' });
    }
});

// Capture order
router.post('/capture-order', async (req, res) => {
    try {
        const { orderID, cart } = req.body;

        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});

        const capture = await paypalClient.execute(request);
        const result = capture.result;

        if (result.status === "COMPLETED") {

            const payerEmail = result.payer.email_address;
            const transactionID =
                result.purchase_units[0].payments.captures[0].id;

            const total = cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            await pool.query(
                `INSERT INTO orders 
                (order_id, transaction_id, email, items, total, status, created_at)
                VALUES (?, ?, ?, ?, ?, ?, NOW())`,
                [
                    result.id,
                    transactionID,
                    payerEmail,
                    JSON.stringify(cart),
                    total,
                    result.status
                ]
            );
        }

        res.json({
            success: result.status === "COMPLETED",
            status: result.status
        });

    } catch (err) {
        console.error('Capture error:', err);
        res.status(500).json({
            success: false,
            error: 'PayPal order capture failed'
        });
    }
});

export default router;
