const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    }
});

module.exports = userSchema;