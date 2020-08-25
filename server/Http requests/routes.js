var passport = require('passport');
var fs = require('fs')
const bcrypt = require("bcryptjs");
var User = require('../models/User');
var Profile = require('../models/Profile');
var Booking = require('../models/Booking');

module.exports = function(server) {
    server.get('/getAll', async (req, res) => {
        console.log(req.session)
        let booking=await  Booking.find().populate({
          path:"driver",model:"users"  
         })
         .populate({
          path:"user",model:"users"  
         })
        let users=await User.find();
        console.log(users);
        return res.json({ success: true, users,booking })
    })

    // @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
server.get('/api/profile/allprofiles', (req, res) => {
    const errors = {};
  
    Profile.find()
      .populate('user')
      .then(profiles => {
        console.log('proo',profiles)
        if (!profiles) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }
  
        res.json(profiles);
      })
      .catch(err => {
        console.log(err)
        res.status(404).json({ profile: 'There are no profiles' })});
    });

    server.get("/api/booking/updatedrequets", async (req, res) => {
        let data=await  Booking.find().populate({
          path:"driver",model:"users"  
         })
         .populate({
          path:"user",model:"users"  
         })
         return res.json({ success: true, data })
      })

}