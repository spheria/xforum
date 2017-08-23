var moment = require('moment');
var PostsDB = require('./models/Post');
var slug = require('slug');

for (var i = 0; i < 20000; i++) {
  var type = (Math.random().toFixed(1))*10;
  new PostsDB({
    title: "test title",
    slug: slug("test title"),
    // body: req.body.body,  // removed for economy
    markdown:"### HEADER ### test -",
    html:"<h1>HEADER<h1> <strongg>test</strong>",
    tags: "test1, test2, test3",
    user_id: 1,
    type:type
  }).save()
  .then(function(saved) {
    console.log(i+"saved");
  })
  .catch(function(err) {
    if (err.code) {
      console.log(err.code);
    }
  });
}



// console.log((Math.random().toFixed(1))*10);
