const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { products, userId, shippingAddress } = req.body;
    console.log(userId, "userIduserIduserIduserId");

    // Validate products and calculate total
    let totalAmount = 0;
    const lineItems = [];
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      totalAmount += product.price * item.quantity;
      lineItems.push({
        price: product.stripePriceId,
        quantity: item.quantity
      });

      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Create or get Stripe customer
    let user = await User.findById(userId);
    console.log(user, "USER-backend");
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name
      });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        userId: userId,
        totalAmount: totalAmount.toString()
      }
    });

    // Create order
    const order = new Order({
      user: userId,
      products: orderProducts,
      totalAmount,
      shippingAddress,
      stripeSessionId: session.id
    });

    await order.save();

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: error.message });
  }
});

// Webhook to handle successful payments
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      // Update order status
      const order = await Order.findOne({ stripeSessionId: session.id });
      if (order) {
        order.paymentStatus = 'completed';
        order.stripePaymentIntentId = session.payment_intent;
        await order.save();

        // Update product stock
        for (const item of order.products) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.quantity }
          });
        }
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  }

  res.json({ received: true });
});

// Get payment intent status
router.get('/payment-intent/:paymentIntentId', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.paymentIntentId);
    res.json(paymentIntent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 