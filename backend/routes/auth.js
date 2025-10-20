const express = require('express') ;
const User = require('../models/UserSchema')
const router = express.Router() ;
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;
require('dotenv').config();
const fetchuser = require('../middleware/fetchuser') ;

const JWT_KEY = 'H5a4m3z2a1'


// Route 1: creating a user    |    using POST: /api/auth/createuser    |   Login not required
router.post('/createuser' , [
    body('name', 'The name should contain at least 3 characters.').isLength({min:3}) ,
    body('email', 'Please enter a valid email.').isEmail(),
    body('password', 'The password should be at least 5 characters long').isLength({min:5})
] , async (req, res) => {

    // Vaildating the above conditions on the data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Errors: errors.array() });
    }

    try {
        let success = false ;
        // Finding if the provided email already exists or not
        let user = await User.findOne({email: req.body.email});
        if(user){
            console.log("Creating User Failed! This User exists")
            return res.status(400).json({success, message: "This Email is already in use"})
        } 

        // Encrypting the password
        const salt = await bcrypt.genSalt(10);
        const secretPassword = await bcrypt.hash(req.body.password, salt);
        
        // Creating a user and displaying success message
        user = await User.create({
            name: req.body.name,
            password: secretPassword,
            email: req.body.email
        })

        // Generating a Token
        const data = {
            user : {
                id : user.id
            }
        }
        const token = jwt.sign( data, JWT_KEY ) 

        // token send to user
        success = true ;
        res.json({success, token});
        console.log('New User Created Successfully!') ; 

    } catch (error) {
        console.error(error.message) ;
        res.status(500).send('Unfortunately, some error has occured')
    }
})



// Route 2: User login - User Authentication    |   using POST: /api/auth/login  |  Login not required
router.post('/login' , [
    body('email', "Please Enter a valid email.").isEmail() ,
    body('password' , "Please Enter a password.").exists()
], async (req, res) => {
    try {
        let success = false ;
        // Validating the user
        const errors = validationResult(req) ;
        if(!errors){
            return res.status(400).json({Error: errors.array()})
        }

        // Finding the given user
        const {email, password} = req.body ;
        const loginUser = await User.findOne({email}) ;
        if(!loginUser){
            return res.status(400).json({ success, message: "Please Enter correct details"})
        }
        
        // Comparing the passwords
        const passwordCompare = await bcrypt.compare(password, loginUser.password) ;
        if(!passwordCompare){
            return res.status(400).json({success, message: "Please Enter correct details"})
        }

        // providing the token
        const loginData = {
            user : {
                id : loginUser.id
            }
        }
        const token = jwt.sign( loginData , JWT_KEY); 
        success = true;
        res.json({success, token});
        console.log("User Login Succesful!")
       
    } catch (error) {
        console.error(error.message) ;
        res.status(500).send("Internal Server Error || Login error") ;
    }
})




// Route 3: Getting the user details from the token    |   using POST: /api/auth/getuser    |   Login required
router.post('/getuser' , fetchuser, async (req,res) => {
    try {
        // importing the user id
        user_id = req.user ;
        // finding the user by id and selecting all the details except password
        const userDetails = await User.findById(user_id).select('-password') ;
        res.send(userDetails) ;
        console.log("Details are displayed!") ;
    } catch (error) {
        console.error(error.message) ;
        res.status(500).send("Internal Server Error") ;
    }
})

module.exports = router ;