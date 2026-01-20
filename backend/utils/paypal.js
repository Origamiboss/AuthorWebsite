// backend/utils/paypal.js
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;


const environment = new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
// For live: use LiveEnvironment instead
const paypalClient = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

export { checkoutNodeJssdk, paypalClient };
