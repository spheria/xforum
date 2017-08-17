exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('pages', function(table) {
      table.increments();
      table.string('name').unique().notNull();
      table.integer('comments').unsigned().defaultTo(0);
      table.integer('view').unsigned().defaultTo(0);
      table.integer('user_id');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pages')
  ])
};
