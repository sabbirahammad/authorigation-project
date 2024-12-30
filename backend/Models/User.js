const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Capital 'S' for Schema

const userSchema = new Schema({
    name: {
        type: String, // Corrected 'typeof' to 'type'
        required: true
    },
    email: {
        type: String, // Corrected 'typeof' to 'type'
        required: true,
        unique: true,
    },
    password: {
        type: String, // Corrected 'typeof' to 'type'
        required: true
    }
});

const userModel = mongoose.model('User', userSchema); // Capitalized 'User' for model name
module.exports = userModel;
