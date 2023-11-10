const express = require("express");
userRoute = express();

const authenticator = require("../middleware/authenticator");
const userController = require("../controllers/userController");

userRoute.post("/signup", userController.SignUp);

userRoute.post("/signin", userController.SignIn);

userRoute.use(authenticator);

userRoute.get('/userDetails', userController.Details);

userRoute.post('/createnote', userController.CreateNote);

userRoute.delete('/deletenote', userController.DeleteNote);

userRoute.put('/editnote', userController.EditNote);

module.exports = userRoute;
