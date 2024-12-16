const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minlength: [3, "username must be at least 3 characters long"],

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [13, "email must be at least 3 characters long"],
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "password must be at least 8 characters long"]
    }
})



const user = mongoose.model('user',userSchema);

module.exports = user;