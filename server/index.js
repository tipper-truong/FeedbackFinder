const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); // returns req.body of the request
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // how long the cookie exists in a browser --> 30 days
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // save sessions 

require('./routes/authRoutes')(app); // Google OAuth Implementations
require('./routes/billingRoutes')(app); // Stripe Billing Implementations

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!

  app.use(express.static('server/client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

