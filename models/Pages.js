var bookshelf = require('../config/bookshelf');
Pages = bookshelf.Model.extend({
  tableName: 'pages',
  hasTimestamps: true,
  initialize: function() {
    // this.on('saving', this.hashPassword, this);
  },
});

module.exports = Pages ;
