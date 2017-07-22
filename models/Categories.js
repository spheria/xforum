var bookshelf = require('../config/bookshelf');
Categories = bookshelf.Model.extend({
  tableName: 'categories',
  hasTimestamps: true,
  initialize: function() {
    // this.on('saving', this.hashPassword, this);
  },
});

module.exports = Categories ;
