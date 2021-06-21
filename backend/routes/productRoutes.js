const express = require('express');
const router = express.Router();
const { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview } = require('../controllers/productController.js')
const { protect, admin } = require('../middlewares/authMiddleware.js')


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect,createProductReview)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).
put(protect, admin, updateProduct)


module.exports = router;


