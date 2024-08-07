var express = require('express');

var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.render('index');
// });
// router.get('/register', (req, res, next) => {
//   res.render('register');
// });
// router.post('/', (req, res, next) => {
//   User.create(req.body, (err, user) => {
//     if (err) return next(err);
//     res.redirect('/users');
//   });
// });
// router.get('/login', (req, res, next) => {
//   res.render('login');
// });
// router.post('/login', (req, res, next) => {
//   const { email, password } = req.body;

//   // Check if both email and password are provided
//   if (!email || !password) {
//     return res.redirect('/users/login'); // Ensure the function exits early
//   }

//   // Find user by email
//   User.findOne({ email }, (err, user) => {
//     if (err) return next(err); // Pass any errors to the error handler
//     if (!user) {
//       return res.redirect('/users/login'); // User not found
//     }

//     // Verify the password
//     user.verifyPassword(password, (err, result) => {
//       if (err) return next(err); // Pass any errors to the error handler
//       if (!result) {
//         return res.redirect('/users/login'); // Incorrect password
//       }

//       // Set session and redirect to users page
//       req.session.user = user;
//       res.redirect('/users/register');
//     });
//   });
// });
router.get('/', (req, res, next) => {
  res.render('user');
});
router.get('/login', (req, res, next) => {
  res.render('login');
});
router.get('/register', (req, res, next) => {
  res.render('register');
});
router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
});
router.get('/userlogin', (req, res, next) => {
  res.render('userlogin');
});
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.redirect('/users/register');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/users/register');
    }
    user.varifyPassword('password', (err, result) => {
      if (err) return next(err);
      if (!result) {
        return res.redirect('/users/register');
      }
      req.session.userId = user.id;
      res.redirect('/users');
    });
  });
});
module.exports = router;
