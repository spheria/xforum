exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('pages', function(table) {
      table.increments();
      table.string('name').unique().notNull();
      table.integer('comments').unsigned().defaultTo(0);
      table.integer('view').unsigned().defaultTo(0);
      table.integer('user_id').references('users.id');
      table.integer('category_id').references('categories.id');
      table.integer('category_name');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pages')
  ])
};
