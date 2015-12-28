var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var createAdjacencyList = require('../lib/filterConnections').adjacencyList
var findConnections = require('../lib/filterConnections').findConnections

router.get('/', function(req, res, next) {
  knex('users').then(function (users) {
    res.render('index', { users: users });
  })
});

router.get('/users/:id', function(req, res, next) {
  knex('users').where({id: req.params.id}).first().then(function (user) {

    // actual raw sql query
    // select user_id, users.name as user_name, other_id, others.name as other_name
    // from connections
    // inner join users on users.id = connections.user_id
    // inner join users others on others.id = connections.other_id;

    knex('connections')
      .select('user_id', 'users.name', 'other_id', 'others.name as other_name')
      .innerJoin('users', 'user_id', 'users.id')
      .innerJoin('users as others', 'other_id', 'others.id')
      .then(function (connections) {
        var list = createAdjacencyList(connections)
        var results = findConnections(list, req.params.id)

        // var friends = searchGraph(connections)

        res.render('user', { user: user, list: list, results: results });
    })

  })
});


module.exports = router;
