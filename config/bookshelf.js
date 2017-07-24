var config = require('../knexfile');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');

knex.migrate.latest();

module.exports = bookshelf;

// knex.migrate.latest(config)
// .then(function() {
//   return knex.seed.run();
//   console.log("running migrations..");
// })
// .then(function() {
//   console.log("migrations are finished");
// });
