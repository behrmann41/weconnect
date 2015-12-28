
exports.up = function(knex, Promise) {
  //always include the return because of promise
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
