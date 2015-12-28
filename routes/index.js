var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

router.get('/', function(req, res, next) {
  knex('users').then(function (users) {
    res.render('index', { title: 'Express', users: users });
  })
});

module.exports = router;
