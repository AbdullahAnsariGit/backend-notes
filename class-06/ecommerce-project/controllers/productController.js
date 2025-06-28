const Product = require('../models/product');

const productController = {
  create: async (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price required' });
    }
    try {
      const product = new Product({ name, price, description });
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
      const product = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = productController;