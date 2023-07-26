const express = require('express');
const router = express.Router();
const { reviewController } = require('../controllers');
const catchAsync = require('../utilities/catchAsync');

router.get('/', catchAsync(reviewController.getAllReviews));

module.exports = router;