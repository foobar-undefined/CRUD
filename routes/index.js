const express = require("express");
const router = express.Router();
const passport = require('passport');
const indexController = require("../controllers/index");

router.get("/", indexController.index);

router.get('/auth/google', passport.authenticate(
    'google',
    {
        scope: ['profile', 'email'],
    }
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/songs',
        failureRedirect: '/'
    }
));

 router.get('/logout', function(req, res){
    req.logout(function(){
        res.redirect('/');
    });
 });

module.exports= router;