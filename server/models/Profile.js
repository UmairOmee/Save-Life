const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String,
    required: true,
    max: 40
  },
  status: {
    type: String
  },
  city: {
    type: String
  },
  phonenumber: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  pic: {
    type: String,
    default: "https://res.cloudinary.com/do3itn6kz/image/upload/v1592075157/no-image-pic.jpg"
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
