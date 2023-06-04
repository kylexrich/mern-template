const express = require('express');
const router = express.Router({mergeParams: true});
const { login, register, validateToken, getAuthorizedUser, logout, signAndRedirect} = require("../controllers/auth");
const passport = require("passport");

router.get('/google', passport.authenticate('google', {session: false, scope: ['profile', 'email']}))

router.get('/google/callback', passport.authenticate('google', {session: false, failureRedirect: '/login'}), signAndRedirect);

router.post('/register', register);

router.post('/login', login);

router.get('/get-auth-user', validateToken, getAuthorizedUser);

router.post('/logout', validateToken, logout);

module.exports = router;
