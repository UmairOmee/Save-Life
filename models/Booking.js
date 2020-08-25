const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  phonenumber: {
    type: String,
  },
  address: {
    type: String,
  },
  type: {
    type: String,
    default: "form"
  },
  time: {
    type: String
  },
  userCords: {
    type: Object
},
driverCords: {
    type: Object
},
  date: {
    type: Date
  },
  description: {
    type: String
  }, 
  status:{
    type:String,
    default: "pending"
  }, 
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
});

module.exports = Booking = mongoose.model('booking', BookingSchema);
