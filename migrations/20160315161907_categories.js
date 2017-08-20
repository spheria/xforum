exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function(table) {
      table.increments();
      table.string('name').unique();
      table.integer('user_id').references('users.id');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('categories')
  ])
};
