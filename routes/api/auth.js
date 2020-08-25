const express = require('express');
var passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
var fs = require('fs')

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

var User = require('../../models/User')


router.get('/logout', function (req, res) {
    req.logout();
    res.json({success: true, user:[]})
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ success: true, user: req.user })
});

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email,
    }, (err, user) => {
        console.log(user);
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            // const hashedPassword = bcrypt.hash(req.body.password, 10);
            var newUser = new User();
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.name = req.body.name;
            newUser.isUser = req.body.isUser;
            newUser.isDriver = req.body.isDriver;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save(function (err, user) {
                    if (err) {
                        return res.json({ "success": false, err: err })
                    }
                    res.json({ "success": true, "user": user })
                })
                });
              });
            


        }
    });
})

module.exports = router;