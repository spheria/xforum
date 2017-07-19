var bookshelf = require('../config/bookshelf');
var User = require('./User');

var Posts = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User);
  },
  initialize: function() {
    // this.on('saving', this.hashPassword, this);
  },
});

module.exports = Posts;
