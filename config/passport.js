const passport = require('passport');
const User = require('./database');
const LocalStrategy = require('passport-local').Strategy;
const validPassword = require('../lib/passwordUtils').validPassword;

const verifyCallback = (username, password, done) => {
  User.findOne({ username})
      .then(user => {
        if(!user) {
          return done(null, false);
        }
        const isValid = validPassword(password, user.hash, user.salt);

        if(isValid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => {
        done(err);
      });
};

passport.use(new LocalStrategy(verifyCallback));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userID, done) => {
  User.findById(userID)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});