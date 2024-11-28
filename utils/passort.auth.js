const passport = require('passport');
const LoacalStrategy = require('passport-local').Strategy
const User = require('../models/user.model')

passport.use(
    new LoacalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async(email, password, done )=>{
        try{
            const user = await User.findOne({email});
            if(!user){
                return done(null, false) // or write null for 3rd opt
            }

            const isMatch = await user.isValidPassword(password)
            return isMatch? done(null, user) : done(null, false);

        }catch(error){
            done(error);
        }
    })
)


passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(new Error('User not found'), null);
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


