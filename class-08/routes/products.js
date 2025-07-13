const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    // Create Stripe product
    const stripeProduct = await stripe.products.create({
      name: name,
      description: description,
      images: [image]
    });

    // Create Stripe price
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(price * 100), // Convert to cents
      currency: 'usd'
    });

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      stock,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update Stripe product if name or description changed
    if (req.body.name || req.body.description) {
      await stripe.products.update(product.stripeProductId, {
        name: req.body.name || product.name,
        description: req.body.description || product.description
      });
    }

    // Update price in Stripe if price changed
    if (req.body.price && req.body.price !== product.price) {
      const newStripePrice = await stripe.prices.create({
        product: product.stripeProductId,
        unit_amount: Math.round(req.body.price * 100),
        currency: 'usd'
      });
      req.body.stripePriceId = newStripePrice.id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Archive Stripe product (don't delete to preserve order history)
    await stripe.products.update(product.stripeProductId, {
      active: false
    });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 