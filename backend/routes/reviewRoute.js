const express = require('express');
const router = express.Router();
const { reviewController, commentController } = require('../controllers');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn } = require('../middlewares/auth');

router.get('/', isLoggedIn, catchAsync(reviewController.getAllReviews));
router.post('/:id/comments', isLoggedIn, catchAsync(commentController.addComment));
router.get('/:id/comments', isLoggedIn, catchAsync(commentController.getComments));

module.exports = router;