const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // how long the cookie exists in a browser --> 30 days
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // save sessions 

require('./routes/authRoutes')(app); // Google OAuth Implementations

const PORT = process.env.PORT || 5000;
app.listen(PORT);

