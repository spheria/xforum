var moment = require('moment');
var PostsDB = require('./models/Post');
var UserDB = require('./models/User');
var slug = require('slug');
const faker = require('faker');

for (var i = 0; i < 20000; i++) {
  var type = (Math.random().toFixed(1))*10;
  let title = faker.fake("{{lorem.words}}");
  new PostsDB({
    title: title,
    slug: slug(title),
    // body: req.body.body,  // removed for economy
    markdown:"### HEADER ### test -",
    html:"<h1>HEADER<h1> <strongg>test</strong>",
    tags: "test1, test2, test3",
    user_id: i+1,
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


// for (var i = 0; i < 10; i++) {
//   var type = (Math.random().toFixed(1))*10;
//   new UserDB({
//     firstname : faker.name.firstName(),
//     lastname : faker.name.lastName(),
//     email : faker.internet.email(),
//     password : faker.internet.password(),
//     name : faker.internet.password(),
//   }).save()
//   .then(function(saved) {
//     console.log("user "+i+" saved");
//   })
//   .catch(function(err) {
//     if (err.code) {
//       console.log(err.code);
//     }
//   });
// }


// console.log((Math.random().toFixed(1))*10);
// console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
// console.log(faker.fake("{{lorem.sentences}}"));
