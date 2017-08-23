exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function(table) {
      table.increments();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('page_id').unsigned().references('pages.id');
      table.integer('category_id').unsigned().references('categories.id');
      table.integer('page_name').unsigned();
      table.integer('category_name').unsigned();
      table.integer('type').unsigned();
      table.string('title');
      table.string('slug');
      table.string('tags');
      table.integer('status').unsigned().defaultTo(1);
      table.integer('comments').unsigned().defaultTo(0);
      table.integer('views').unsigned().defaultTo(0);
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
