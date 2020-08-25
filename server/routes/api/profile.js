const express = require('express');
var passport = require('passport');
const router = express.Router();


//Loads Validation
const validateProfileInput = require('../../validation/profile');


// Loads Profilr Model
const Profile = require('../../models/Profile');

// Loads User model
const User = require('../../models/User');


// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/:user_id',
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
  //   .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);


// // @route   GET api/profile/all
// // @desc    Get all profiles
// // @access  Public
// router.get('/allprofiles', (req, res) => {
//   const errors = {};

//   Profile.find({})
//     .populate('user')
//     .then(profiles => {
//       console.log('proo',profiles)
//       if (!profiles) {
//         errors.noprofile = 'There are no profiles';
//         return res.status(404).json(errors);
//       }

//       res.json(profiles);
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(404).json({ profile: 'There are no profiles' })});
//   });


router.post(
    '/',
    (req, res) => {
       const { errors, isValid } = validateProfileInput(req.body);
  
       // check validation
       if(!isValid) {
         return res.status(400).json(errors);
       }
  
      // Get fields
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.username) profileFields.username = req.body.username;
      if (req.body.phonenumber) profileFields.phonenumber = req.body.phonenumber;
      if (req.body.city) profileFields.city = req.body.city;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.pic) profileFields.pic = req.body.pic;
  
      // Social
      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  
      Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
        //   // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create
          new Profile(profileFields).save().then(profile => res.json(profile));
          // Check if handle exists
          // Profile.findOne({ handle: profileFields.handle }).then(profile => {
          //   if (profile) {
          //     errors.handle = 'That handle already exists';
          //     res.status(400).json(errors);
          //   }
            // else {
              // Save Profile
            // }
          // });
        }
      });
    }
  );


module.exports = router;
