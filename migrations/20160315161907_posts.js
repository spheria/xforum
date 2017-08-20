exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function(table) {
      table.increments();
      table.integer('user_id').references('users.id');
      table.integer('page_id').references('pages.id');
      table.integer('category_id').references('categories.id');
      table.integer('page_name');
      table.integer('category_name');
      table.string('title');
      table.string('slug').unique();
      table.integer('status').unsigned().defaultTo(1);
      table.string('tags');
      table.integer('comments').unsigned().defaultTo(0);
      table.text('body');
      table.text('html');
      table.text('markdown');
      table.timestamps();

    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts')
  ])
};
