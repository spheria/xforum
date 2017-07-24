exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function(table) {
      table.increments();
      table.integer('user_id');
      table.string('title');
      table.string('slug').unique();
      table.string('name');
      table.string('type');
      table.string('tags');
      table.string('categories');
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
