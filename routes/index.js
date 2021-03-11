const passport = require('passport');
const { genPassword } = require('../lib/passwordUtils');
const User = require('../config/database');
const { isAuth, isAdmin } = require('./authMiddleware');
const router = require('express').Router();



// =======GET ROUTES=======

router.get('/protected', isAuth, (req, res, next) => {
  res.send('You made it to view this route.');
  // if(req.isAuthenticated()) {
  //   res.send(`<h1>You are authenticated</h1><p><a href='/logout'>Logout and realoaded</a></p>`);
  // } else {
  //   res.send(`<h1>You are  not authenticated</h1><p><a href='/login'>Login</a></p>`);
  // }
});

router.get('/', (req, res, next) => {
  res.send(`<h1>Home</h1><p><a href='/register'></a></p>`);
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/admin', isAuth, isAdmin, (req, res) => {
  res.send('This page is only for admin')
});
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/protected');
});


// =======POST ROUTES=======

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/protected'}), (req, res, next) => {
  res.status(200).json({
    message: 'Login successfully'
  });
});

router.post('/register', (req, res) => {
  const { username, password} = req.body;
  const saltHash = genPassword(password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username,
    hash,
    salt,
    admin: true
  });
  newUser.save()
    .then(user => {
      console.log(user);
    })
    .catch(err => console.log(err));
  res.redirect('/login');
});


module.exports = router;