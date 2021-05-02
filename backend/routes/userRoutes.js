const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUsers, getUserById, updateUser } = require('../controllers/userController.js')
const { protect, admin} = require('../middlewares/authMiddleware.js')

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile')
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUsers).get(protect,admin, getUserById)
                        .put(protect,admin, updateUser)


module.exports = router;
