
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//register

const SignUp = async (req,res) => {
    try {
        const { firstname,lastname,email,password} = req.body;
        console.log(firstname,lastname,email,password);

        const user = await User.findOne({email});
        if(user){
            res.status(400).json('user already present')
        }else{
            const hashPassword = await bcrypt.hash(password, 10);
            const userSaved = await User.create({
                name : firstname + ' ' + lastname,
                email : email,
                password : hashPassword
            })
            if(userSaved){
                res.status(201).json('user registered successfully. Login now!');
            }else{
                res.status(400).json('registration failed');
            }
        }
    } catch (error) {
        res.status(401).json('invalid credentials')
    }
}

//login 

const SignIn = async (req,res) => {
    try {
        const {email, password} = req.query;
        console.log(email, password)
        const user = await User.findOne({email});
        if(user){
            const passwordMatch = await bcrypt.compare( password,user.password)
            if(passwordMatch){
                res.status(200).json({
                    token: jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET)
                })
            }else{
                res.status(400).json('incorrect password'); 
            }
        }else{
            res.status(400).json('register first');
        }
    } catch (error) {
        res.status(400).json('invalid credentials');
    }
}

module.exports = {
    SignUp,
    SignIn
}