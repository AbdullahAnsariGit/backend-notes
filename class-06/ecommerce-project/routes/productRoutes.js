const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticate = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

router.post('/products', authenticate, isAdmin, productController.create);
router.get('/products', productController.getAll);
router.put('/products/:id', authenticate, isAdmin, productController.update);
router.delete('/products/:id', authenticate, isAdmin, productController.delete);

module.exports = router;