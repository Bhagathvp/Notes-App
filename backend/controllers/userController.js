
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Encrypt = (data) =>{
    const token = jwt.sign({data}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '1h',
      })
    return token;
}

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
        const {email, password} = req.body;
        console.log(email, password)
        const user = await User.findOne({email});
        console.log(user)
        if(user){
            const passwordMatch = await bcrypt.compare( password,user.password)
            if(passwordMatch){
                res.status(200).json({
                    token: Encrypt(user.id)
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

//details

const Details = async (req,res) =>{
    try {
        const id = req.userId;
        const user = await User.findOne({ _id:id });
        console.log(user)
        if(user){
            res.status(200).json(user);
        }else{
            res.status(400).json('user details not found');
        }

    } catch (error) {
        res.status(400).json('error found');
    }
}

//create note
const CreateNote = async (req,res)=>{
    try {
        const {heading, description} = req.body;
        console.log(heading,description);
        const user = await User.findOne({_id : req.userId})
        if(user){
            user.notes.push({
                heading,
                description
            })
            const added = await user.save({new: true})
            res.status(200).json(added);
        }else{
            res.status(400).json('user details not found');
        }
    } catch (error) {
        res.status(400).json('error found');
    }
}

//deleting notes
const DeleteNote = async (req,res)=>{
    try {
        const {id} = req.query;
        console.log(id);
        const user = await User.findOne({_id : req.userId})

        if(user){
            const arr =[]
            user.notes.map((note)=>{
                if(note.id !== id){
                    arr.push(note)
                }
            })
            user.notes = [...arr];
            console.log(user.notes);
            const deleted = await user.save({new : true});
            res.status(200).json(deleted);
        }else{
            res.status(400).json('user details not found');
        }
    } catch (error) {
        res.status(400).json('error found');
    }
}

//editing notes
const EditNote = async (req,res)=>{
    try {
        const {id,heading,description} = req.body;
        console.log(id);
        const user = await User.findOne({_id : req.userId})
        if(user){

           const updatedUser = user.notes.map(note =>{
                if(note.id === id){
                    console.log('inside')
                    note.heading = heading;
                    note.description = description;
                }
                return note;
           })
           console.log('after====>',updatedUser);
            const added = await user.save({new: true})
            res.status(200).json(added);
        }else{
            res.status(400).json('user details not found');
        }

    } catch (error) {
        res.status(400).json('error found');
    }
}

module.exports = {
    SignUp,
    SignIn,
    Details,
    CreateNote,
    DeleteNote,
    EditNote
}