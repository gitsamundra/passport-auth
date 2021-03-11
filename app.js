
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const RedisStore = require('connect-redis')(session);
require('dotenv').config();
const cookieParser = require('cookie-parser');
const redis = require('redis');
require('./config/database');
const router = require('./routes/index');
const ejs = require('ejs');
const passport = require('passport');
// dotenv.config();

const app = express();
app.use(cookieParser());

const clientRedis = redis.createClient({
  host: 'localhost',
  port: 6379
});

clientRedis.on('error', err => {
  console.log('Couldnot established connection with redis.' + err);
});

clientRedis.on('connect', err => {
  console.log('Connected to redis successfully.');
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
// Session setup
app.use(session({
  name: 'SID',
  store: new RedisStore({ client: clientRedis}),
  secret: 'super secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// =======POSSPORT AUTHENTICATION========
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// =========ROUTES==========
app.use('/', router);

app.listen(4000, () => console.log('Server running on port 4000'));