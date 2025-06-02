const passport = require("passport");
require('dotenv').config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;

console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);  // debug logs
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   callbackURL: "/auth/google/callback",
    callbackURL: process.env.GOOGLE_CALLBACK_URL,

    // callbackURL: "http://localhost:5000/auth/google/callback",

    },
    (accessToken, refreshToken, profile, done) => {
      // Optionally store user in DB
      return done(null, {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
      });
    }
  )
);
