const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
    request: [],
    // acceptRequest: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'booking'
    //   },
    //   userRequest: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'booking'
    //   },
    isUser: {
        type: Boolean,
        default: true
    },
    isDriver: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,

    }
})

module.exports = User = mongoose.model('users', UserSchema);