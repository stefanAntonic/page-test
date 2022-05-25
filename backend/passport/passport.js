const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')

const GOOGLE_CLIENT_ID ="747547467787-5fm5if3inf38uvel92q14og5d038opqp.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET ="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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
  }
));

passport.serializeUser((user,done) => {
    done(null, user)
})
passport.deserializeUser((user,done) => {
    done(null, user)
})