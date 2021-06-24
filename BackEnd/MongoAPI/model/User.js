const mongoose = require('mongoose');

//DB Schema of users
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255   
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6   
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6   
    },
    admin: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);