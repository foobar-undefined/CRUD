const passport = require('passport');
//google oauth module
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy(
    //configuration object
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    //callback function, to consume promises using await 
    async function(accessToken, refreshToken, profile, callBack){
        try{
            console.log(profile);
            let user = await User.findOne({ googleID: profile.id});
            if(user) return callBack(null, user);     
            user = await User.create({
                name: profile.displayName,
                googleID: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            });
            return callBack(null, user);
        }catch(err){    
            return callBack(err)
        }
    }
));

passport.serializeUser(function(user, cb){
    cb(null, user._id);
});

passport.deserializeUser(async function(userId, cb){
    cb(null, await User.findById(userId));
});

