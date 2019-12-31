var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.send(
    'Это страница авторизации, отправьте сюда POST запрос {email, password}'
  );
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Укажите правильный email и пароль!');
    }
    req.login(user, err => {
      return res.send('Вы удачно прошли аутентификацию!');
    });
  })(req, res, next);
});

router.get('/secret', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Вы прошли авторизацию и оказались на закрытой странице');
  } else {
    res.status(403).send('Доступ запрещен');
  }
});

router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
