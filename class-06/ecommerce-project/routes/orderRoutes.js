const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/auth');

router.post('/orders', authenticate, orderController.create);
router.get('/orders', authenticate, orderController.getAll);

module.exports = router;