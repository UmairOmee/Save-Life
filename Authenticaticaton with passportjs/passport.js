var session = require("express-session")
var passport = require('passport');
const bcrypt=require("bcryptjs");       
var LocalStrategy = require('passport-local').Strategy;
const User=require('../models/User');

module.exports = function (server) {
    server.use(session( { 
        secret: "secret-word",
        resave:false,
        name:'Umair',
        cookie:{
            maxAge:2592000000,//30 days
            sameSite:true,
            secure:false //in development it will be false 
        }}));
    server.use(passport.initialize());
    server.use(passport.session());
    passport.use(new LocalStrategy(
        function (username,password, next) {
            console.log(username,password);
            User.findOne( {
             email :username, 
            },(err,user)=>{
                console.log(user);
                if(err) throw err;
                if(!user) return next(null, false);
bcrypt.compare(password,user.password,(err,result)=>{
    if(err) throw err;
    if(result===true){
        console.log("wow", user)
       return next(null, user);
    }else{
        return next(null, false);
    }
})
                
            }
            )}
    ));

               
    passport.serializeUser(function (user, next) {
        next(null, user._id.toHexString());
    
    });
    passport.deserializeUser(function (userId, next) {
        User.findOne({ _id: userId }, function(err, user){
            next(err, user);
        })
})}