require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripePayments = async (req, res) => {
    try {
        const totalShipping = req.body.cartItems.reduce((total, current) => total += (current.product.shipping_price.value * current.quantity), 0);

        const lineItems = req.body.cartItems.map(cartItem => {
            return {
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: `${cartItem.product.title} - Size ${cartItem.size}`,
                        images: [cartItem.product.images[0]]
                    },
                    unit_amount: cartItem.product.price.value * 100,
                },
                quantity: cartItem.quantity
            };
        });

        console.log(lineItems[0].price_data.product_data);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: [
                    'US', 
                    'AT', 
                    'BE', 
                    'BG', 
                    'CZ', 
                    'HR', 
                    'DK',
                    'EE',
                    'FR',
                    'DE',
                    'GR',
                    'GB',
                    'HU',
                    'IT',
                    'LV',
                    'LT',
                    'LU',
                    'NL',
                    'PL',
                    'RO',
                    'PT',
                    'SK',
                    'SI',
                    'ES',
                ],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: totalShipping * 100,
                            currency: 'USD'
                        },
                        display_name: 'Clothes Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 10,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 15,
                            },
                        },
                    },
                },
            ],
            phone_number_collection: {
                enabled: true,
            },
            line_items: lineItems,
            success_url: process.env.CLIENT_URL,
            cancel_url: process.env.CLIENT_URL,
        })

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
};

const stripeCheckoutCompleted = (req, res) => {
    const signature = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
        console.log(`Stripe Webhooks Error: ${err.message}`);
        res.status(400).send(`Stripe Webhooks Error: ${err.message}`);
        return;
    };

    if (event.type === "checkout.session.completed") {
        console.log(event);
    };

    res.send().end();
};

module.exports = { stripePayments, stripeCheckoutCompleted };