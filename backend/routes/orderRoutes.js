const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } = require('../controllers/orderController.js')
const { protect, admin } = require('../middlewares/authMiddleware.js')

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)



module.exports = router;
