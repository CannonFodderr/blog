var express                 = require('express'),
    router                  = express.Router(),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    passportLocalMongoose   = require('passport-local-mongoose'),
    User                    = require('../models/user');

router.get('/register', function(req, res){
    res.render('auth/register');
});

router.post('/register', function(req, res){
    var newUser = new User({
        username: req.body.user.username
    })
    User.register( newUser, req.body.user.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect('/register');
        } else {
            User.authenticate('local')(req, res, function(){
                req.flash("success", "Thank you! you can now login.")
                res.redirect('/login');
            })
        }
    })
});

router.get('/login', function(req, res){
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', function(req, res){
    req.logout();
    req.flash("success", "Logged out");
    res.redirect('/blog');
});


module.exports = router;