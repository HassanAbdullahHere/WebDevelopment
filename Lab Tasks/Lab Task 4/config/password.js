var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require = require('bcryptjs');

module.exports = function(passport) {
    passport.use(new LocalStrategy(async(username, password, done)=>{
        let user = await User.findOne({username:username});
        bcrypt.compare(password, user.password, function(err, isMatch){
            if(err) console.log(err);
            if(isMatch){
                return done(null, user);
            }else{
                return done(null, false, "wrong password");
            }
        })
    }) )
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    passport.deserializeUser(async(user, done)=>{
        let u = await User.findById(id);
        done(eerr, u);
    });
}