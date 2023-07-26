const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: './public/' })
const catchAsync = require('../utilities/catchAsync');
const { followerController } = require('../controllers');
const { isLoggedIn } = require('../middlewares/auth');

router.get('/my-follows', isLoggedIn, catchAsync(followerController.getFollowedUsers));
router.get('/follow-able-users', isLoggedIn, catchAsync(followerController.getFollowAbleUsers));

module.exports = router;