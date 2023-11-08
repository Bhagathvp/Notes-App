const express = require('express');
userRoute = express();

const userController = require('../controllers/userController')

userRoute.post('/signup', userController.SignUp)

userRoute.get('/signin', userController.SignIn)

module.exports = userRoute;