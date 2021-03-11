module.exports.isAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({message: 'You are not authorized to view this route.'});
  }
};

module.exports.isAdmin = (req, res, next) => {
  if(req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.send('You are not admin');
  }
};