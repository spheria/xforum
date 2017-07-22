var async = require('async');
// var crypto = require('crypto');
// var nodemailer = require('nodemailer');
// var jwt = require('jsonwebtoken');
var moment = require('moment');
// var request = require('request');
// var qs = require('querystring');
// var UserDB = require('../models/User');
var PostsDB = require('../models/Post');

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
    res.status(400).send({ msg: 'Please Login.' });
    return true;
  }

  var user_id = req.user.id ;
  new PostsDB().where({user_id:user_id}).fetchAll().then(function(collection) {
    if (!collection) {
      res.send({ msg: 'Your dont have any posts. Create one!' });
    } else {
      // res.send({ posts: collection , msg: 'You have '+ collection.length +' posts.'});
      res.render('account/posts', { posts: collection.toJSON() , msg: 'You have '+ collection.length +' posts.'});
    }
  }).catch(function(err) {
    res.status(500).json({error: true, data: {mgs: err.message}});
  });
};


exports.getNewPostForm = function(req, res, next) {
  res.render('account/newPost', {
    title: 'New Post'
  });
};
exports.getPostbyId = function(req, res, next) {

  PostsDB.forge({id: req.params.id})
  .fetch({withRelated: ['category', 'tags']})
  .then(function (post) {
    if (!post) {
      res.status(404).json({error: true, data: {}});
    }
    else {
      res.json({error: false, data: post.toJSON()});
    }
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {msg: err.message}});
  });
};

exports.postNewPost = function(req, res, next) {
  req.assert('title', 'Title cannot be blank').notEmpty();
  req.assert('body', 'Body cannot be blank').notEmpty();
  req.assert('tags', 'Tags cannot be blank').notEmpty();
  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    res.status(301).redirect('/account/posts/new');
  }

  new PostsDB({
    title: req.body.title,
    body: req.body.body,
    user_id: req.user.id
  }).save()
  .then(function(saved) {
    console.log("saved+++++");
    console.log(saved);
    res.status(301).redirect('/account/posts', { msg: 'Post Created!' });
  })
  .catch(function(err) {
    if (err.code) {
      console.log("err++++++");
      console.log(err);
      res.status(500).send({ msg: 'SERVER_ERROR' });
    }
  });
};
