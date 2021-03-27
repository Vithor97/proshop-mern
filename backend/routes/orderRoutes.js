const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/orderController.js')
const { protect } = require('../middlewares/authMiddleware.js')

router.route('/').post(protect, addOrderItems)



module.exports = router;
