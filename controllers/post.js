var async = require('async');
// var crypto = require('crypto');
// var nodemailer = require('nodemailer');
// var jwt = require('jsonwebtoken');
var moment = require('moment');
// var request = require('request');
// var qs = require('querystring');
var responseMessages = require('../config/responses');

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
  // new PostsDB
  // .orderBy('id') // Same as .orderBy('cars.productionYear', 'DESC')
  // .fetchPage({
  //  pageSize: 15, // Defaults to 10 if not specified
  //  page: 1, // Defaults to 1 if not specified
  //
  //  // OR
  //  // limit: 15,
  //  // offset: 30,
  //
  // //  withRelated: ['engine'] // Passed to Model#fetchAll
  // })
  // .then(function (results) {
  //       res.render('account/posts', { posts: collection.toJSON() , msg: 'You have '+ collection.length +' posts.'});
  // }).catch(function(err) {
  //   res.status(500).json({error: true, data: {mgs: err.message}});
  //   res.status(500).render('error'mgs: err.message});
  // });

  new PostsDB().where({user_id:user_id}).orderBy('id', 'DESC')
  .fetchAll({limit: 15})
  .then(function(collection) {
    if (!collection) {
      res.send({ msg: 'Your dont have any posts. Create one!' });
    } else {
      // res.send({ posts: collection , msg: 'You have '+ collection.length +' posts.'});
      res.render('account/posts', { posts: collection.toJSON() , msg: 'You have '+ collection.length +' posts.'});
    }
  }).catch(function(err) {
    // res.status(500).json({error: true, data: {mgs: err.message}});
    res.status(500).render('error', {mgs: err.message});
  });
};


exports.getNewPostForm = function(req, res, next) {
  res.render('account/newPost', {
    title: 'New Post'
  });
};
exports.getPostbyId = function(req, res, next) {

  PostsDB.forge({id: req.params.id})
  .fetch()
  // .fetch({withRelated: ['categories', 'tags']})
  .then(function (post) {
    if (!post) {
      // res.status(404).json({error: true, data: {}});
      res.status(404).render({msg:responseMessages.E404});
    }
    else {
      res.render('account/readPost',{data: post.toJSON()});
    }
  })
  .catch(function (err) {
    // res.status(500).json({error: true, data: {msg: err.message}});
    res.status(500).render('error', {msg: err.message});
  });
};

exports.putPostbyId = function(req, res, next) {
  console.log("putPostbyId");
    req.assert('title', 'Title cannot be blank').notEmpty();
    req.assert('body', 'Body cannot be blank').notEmpty();
    req.assert('tags', 'Tags cannot be blank').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.flash('error', errors);
      res.status(301).redirect('/account/posts');
    }

    PostsDB.forge({id: req.params.id})
    .save({
      title: req.body.title,
      body: req.body.body,
      user_id: req.user.id
    },{patch:true})
    .then(function(saved) {
      console.log("saved+++++");
      console.log(saved);
        req.flash('success', { msg: 'Your post have been edited.' });
        res.status(301).redirect('/account/posts');
    })
    .catch(function(err) {
      if (err.code) {
        console.log("err++++++");
        console.log(err);
        res.status(500).send({ msg: 'SERVER_ERROR' });
      }
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
      req.flash('success', { msg: 'New post have been saved.' });
      res.status(301).redirect('/account/posts');
  })
  .catch(function(err) {
    if (err.code) {
      console.log("err++++++");
      console.log(err);
      res.status(500).send({ msg: 'SERVER_ERROR' });
    }
  });
};
