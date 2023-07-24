const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const catchAsync = require('../utilities/catchAsync');

router.post('/register', catchAsync(userController.registerUser));
router.post('/login', catchAsync(userController.loginUser));
router.get('/get-access-token', catchAsync(userController.getAccessToken));
router.get('/logout', catchAsync(userController.logout));

module.exports = router;