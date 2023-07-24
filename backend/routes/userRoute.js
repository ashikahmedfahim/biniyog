const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const catchAsync = require('../utilities/catchAsync');

router.get('/', catchAsync(userController.getAllUsers));

module.exports = router;