var express = require('express');
var router = express.Router();
let User = require('../models/User');

/* GET users listing. */
router.get('/register', (req, res, next) => {
  res.render('register');
});
router.post('/register', (req, res, next) => {
  User.create(req.body, (err, users) => {
    if (err) return next(err);
    res.send('User Created');
    console.log(users);
  });
});

module.exports = router;
