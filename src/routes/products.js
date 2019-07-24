const express = require('express');
const router = express.Router();

const checkAuth = require('./middlewares/check-auth');
const productController = require('./controllers/products');

router.get('/', productController.get_all);
router.post('/', checkAuth, productController.create_one);
router.get('/:productId', productController.get_one);
router.patch('/:productId', checkAuth, productController.update_one);
router.delete('/:productId', checkAuth, productController.delete_one);

module.exports = router;
