const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Import User model
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');





router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register',
        body('username').trim().isLength({ min: 3 }),
        body('email').trim().isEmail().isLength({ min: 13 }),
        body('password').trim().isLength({ min: 5 }),
        
     async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Invalid email or password'
            })
        }

        

        const{ username, email, password} = req.body;

        
         // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10); 
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            username,
            email,
            password: hashPassword
            
        })
        // res.json(newUser)
        res.redirect('/user/login')

        
});


router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login',
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            message: 'Invalid email or password'
        })
    }
    const { email, password} = req.body;

    const user = await userModel.findOne({ email});

    if(!user) {
        res.status(400).json({
            errors: errors.array(),
            message: 'Invalid email or password'
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        res.status(400).json({
            errors: errors.array(),
            message: 'Invalid email or password'
        })
    }

    const token = jwt.sign({
        userId : user._id,
        username: user.username,
        email: user.email
    }, 
    process.env.JWT_SECRET,
    )
    
    res.cookie('token', token)
    res.send('Logged in')
    
});



module.exports = router;