const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        findOrCreate
    )
);

async function findOrCreate(accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = await User.findOneAndUpdate({ email: profile.emails[0].value },{ googleId: profile.id });
        }

        if (user) {
            done(null, user);
        } else {
            const newUser = await new User({
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                googleId: profile.id
            });
            await newUser.save();
            done(null, newUser);
        }
    } catch(err) {
        done(err, null);
    }
}

module.exports = passport;
