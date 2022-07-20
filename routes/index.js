var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', name: 'shamili', marks: { cs: 70 } });
});
router.get('/login', function (req, res) {
  res.render('login', { companiname: 'zion IT' })
})
router.get('/signup', function (req, res) {
  res.render('users/signup', { username: 'shamili', phonenumber: '123456765' })
})
router.get('/profile', function (req, res) {
  res.render('users/profile')
})

module.exports = router;
