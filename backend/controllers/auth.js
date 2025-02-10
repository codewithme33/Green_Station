const User = require('../models/User');
const passport = require('passport');


exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
});

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};