var async = require('async');
// var crypto = require('crypto');
// var nodemailer = require('nodemailer');
// var jwt = require('jsonwebtoken');
var moment = require('moment');
// var request = require('request');
// var qs = require('querystring');
var User = require('../models/User');
var Posts = require('../models/Posts');

// function generateToken(user) {
//   var payload = {
//     iss: 'my.domain.com',
//     sub: user.id,
//     iat: moment().unix(),
//     exp: moment().add(7, 'days').unix()
//   };
//   return jwt.sign(payload, process.env.TOKEN_SECRET);
// }

  exports.getAccountPosts = function(req, res, next) {
    if (!req.user) {
      res.status(500).send({ msg: 'Please Login.' });
      return true;
    }

    var user_id = req.user.id ;
    console.log("user_id",user_id);
    Posts.where({user_id:user_id}).fetchAll().then(function(postsData) {
      // console.log(postsData.toJSON());
      if (posts != []) {
        res.send({ msg: 'Your dont have any posts. Create one!' });
        // return
      } else {
        res.send({ posts: postsData , msg: 'You have '+ postsData.length +' posts.'});
        // return
      }
    }).catch(function(err) {
      if (err.code === 'DB_ERROR') {
        res.status(500).send({ msg: 'The email address you have entered is already associated with another account.' });
      }
    });

    // new Posts()
    //   .fetch()
    //   .then(function(user) {
    //     if (!user) {
    //       return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. ' +
    //       'Double-check your email address and try again.'
    //       });
    //     }
    //     user.comparePassword(req.body.password, function(err, isMatch) {
    //       if (!isMatch) {
    //         return res.status(401).send({ msg: 'Invalid email or password' });
    //       }
    //       res.send({ token: generateToken(user), user: user.toJSON() });
    //     });
    //   });
  };
