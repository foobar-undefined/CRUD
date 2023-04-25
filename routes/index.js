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

router.get('/auth/google', passport.authenticate(
    'google',
    {
        successRedirect: '/songs',
        failureRedirect: '/songs'
    }
));

 router.get('/logout', function(req, res){
    req.logout(function(){
        res.redirect('/');
    });
 });

module.exports= router;