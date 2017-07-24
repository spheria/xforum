var async = require('async');
var moment = require('moment');
var messages = require('../config/responses');
var PostsDB = require('../models/Post');

exports.getAccountPosts = function(req, res, next) {
  if (!req.user) {
    req.flash('error', { msg: 'Please Login.' });
    res.status(400).render('error');
    return true;
  }

  var user_id = req.user.id ;
  new PostsDB().where({user_id:user_id}).orderBy('id', 'DESC')
  .fetchAll({limit: 15})
  .then(function(collection) {
    if (!collection) {
      req.flash('error', {msg:"You dont have any post."});
    } else {
      res.render('posts/list', { posts: collection.toJSON() , msg: 'You have '+ collection.length +' posts.'});
    }
  }).catch(function(err) {
    // res.status(500).json({error: true, data: {mgs: err.message}});
    req.flash('error', messages.E500);
    res.status(500).render('error');
  });
};


exports.getNewPostForm = function(req, res, next) {
  res.render('posts/new', {
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
      req.flash('error', messages.E404);
      res.status(404).render(error);
    }
    else {
      res.render('posts/read',{data: post.toJSON()});
    }
  })
  .catch(function (err) {
    req.flash('error', messages.E500);
    res.status(500).render('error');
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
        req.flash('success', { msg: 'Your post have been edited.' });
        res.status(301).redirect('/account/posts');
    })
    .catch(function(err) {
      if (err.code) {
        req.flash('error', messages.E500);
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
      req.flash('error', messages.E500);
      res.status(500).render('error');
    }
  });
};
