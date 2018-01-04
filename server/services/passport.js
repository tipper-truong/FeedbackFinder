const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

// done function --> if successful, attaches the user to the request, also managed internally by passport

passport.serializeUser((user, done) => {
	done(null, user.id); // user.id = _id: {...} from MongoDB
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		});
});

// passport.use excutes first, then serializeUser & deserializeUser
passport.use(
new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		}, 

		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id })
				.then((existingUser) => {
					if(existingUser) {
						// user already exists
						done(null, existingUser); //null = no error
					} else {
						// make a new user
						new User({ googleId: profile.id }) // New Model Instance
							.save()
							.then(user => done(null, user));
					}
				});
		}
	)
);