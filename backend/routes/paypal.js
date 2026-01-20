// routes/paypal.js
import express from 'express';
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
        const { orderID } = req.body;
        console.log('Capture order request body:', req.body);
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});

        const capture = await paypalClient.execute(request);
        res.json(capture.result);
    } catch (err) {
        console.error('Capture error:', err);
        res.status(500).json({ error: 'PayPal order capture failed' });
    }
});

export default router;
