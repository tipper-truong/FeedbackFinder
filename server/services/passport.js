const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

// done function --> if successful, attaches the user to the request, also managed internally by passport
passport.serializeUser((user, done) => { // user -> whatever was pulled out of DB
  done(null, user.id); // user.id = _id: {...} from MongoDB
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
});

// passport.use excutes first, then serializeUser & deserializeUser
passport.use(
  new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
      if(existingUser) {
        // user already exists
        return done(null, existingUser); //null = no error
      }
      // make a new user
      const user = await new User({ googleId: profile.id }).save()
      done(null, user);
    }
  )
);