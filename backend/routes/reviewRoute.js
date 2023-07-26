const express = require('express');
const router = express.Router();
const { reviewController } = require('../controllers');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn } = require('../middlewares/auth');

router.get('/', isLoggedIn, catchAsync(reviewController.getAllReviews));

module.exports = router;