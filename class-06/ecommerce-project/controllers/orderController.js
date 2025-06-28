const Order = require('../models/order');
const Product = require('../models/product');

const orderController = {
  create: async (req, res) => {
    const { items } = req.body; // items: [{ productId, quantity }]
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array required' });
    }
    try {
      let total = 0;
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) return res.status(404).json({ error: `Product ${item.productId} not found` });
        if (!item.quantity || item.quantity < 1) {
          return res.status(400).json({ error: `Invalid quantity for product ${item.productId}` });
        }
        total += product.price * item.quantity;
      }
      const order = new Order({ userId: req.user.id, items, total });
      await order.save();
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
      const orders = await Order.find(query).populate('items.productId');
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = orderController;