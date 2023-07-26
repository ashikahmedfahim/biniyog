const express = require('express');
const router = express.Router();
const { userController, followerController } = require('../controllers');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn } = require('../middlewares/auth');

router.post('/register', catchAsync(userController.registerUser));
router.post('/login', catchAsync(userController.loginUser));
router.get('/get-access-token', catchAsync(userController.getAccessToken));
router.get('/logout', catchAsync(userController.logout));
router.post('/:id/follow', isLoggedIn, catchAsync(followerController.followUser));
router.delete('/:id/unfollow', isLoggedIn, catchAsync(followerController.unfollowUser));

module.exports = router;