const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: './public/' })
const catchAsync = require('../utilities/catchAsync');
const { bookController } = require('../controllers');

router.post('/', upload.single('image'), catchAsync(bookController.createBook));
router.get('/', catchAsync(bookController.getAllBooks));

module.exports = router;