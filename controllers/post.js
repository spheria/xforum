var moment = require('moment');
var messages = require('../config/responses');
var PostsDB = require('../models/Post');

exports.public = {
  getPost : function(req, res, next) {
    let slug = req.params.slug;
    console.log("slug");
    console.log(slug);
    if (!slug) {
      return res.status(404).render("error");
    }
    PostsDB.forge({slug: slug})
    .fetch()
    // .fetch({withRelated: ['categories', 'tags']})
    .then(function (post) {
      if (!post) {
        // res.status(404).json({error: true, data: {}});
        req.flash('error', messages.E404);
        res.status(404).render("error");
      }
      else {
        res.render("public/posts/read", {post:post.toJSON(), title:"Posts"});
        // res.render('readTest',{post: post.toJSON()});
      }
    })
    .catch(function (err) {
      req.flash('error', messages.E500);
      res.status(500).render('error');
    });
  },
  getPostLink : function(req, res, next) {
    res.render("public/posts/link.html" , {title:"Posts"});
  }
}










exports.account = {
  getPosts : function(req, res, next) {
    if (!req.user) {
      req.flash('error', { msg: 'Please Login.' });
      res.status(400).render('error');
      return true;
    }
    console.log(req.query.page);

    var page = req.query.page || 1;
    var limit = req.query.limit || 25;
    var orderBy = req.query.orderby;
    var order = req.query.order || 'asc';
    var user_id = req.user.id ;

    PostsDB
     .query(function (qb) {
       //  qb.innerJoin('manufacturers', 'cars.manufacturer_id', 'manufacturers.id');
       //  qb.groupBy('id');
        qb.where('user_id', '=', user_id);
     })
     .orderBy('id', 'desc') // Same as .orderBy('cars.productionYear', 'DESC')
     .fetchPage({
       pageSize: limit || 15, // Defaults to 10 if not specified
       page: page || 1, // Defaults to 1 if not specified

       // OR
       // limit: 15,
       // offset: 30,

       // withRelated: ['engine'] // Passed to Model#fetchAll
     })
     .then(function(collection) {
       if (!collection) {
         req.flash('error', {msg:"You dont have any post."});
       } else {
         // var showdown  = require('showdown'),
         //       converter = new showdown.Converter(),
         //       text      = '#hello, markdown!',
         //       html      = converter.makeHtml(text);
         if (page == 1) {
           req.flash('success',  {msg: 'You have '+ collection.pagination.rowCount +' posts.'});
         }
         res.render('posts/list', { posts: collection.toJSON() , pagination: collection.pagination, title:"Posts"});
       }
     }).catch(function(err) {
       // res.status(500).json({error: true, data: {mgs: err.message}});
       req.flash('error', messages.E500);
       res.status(500).render('error');
     });

     // Pagination results:
     // {
     //    models: [<Car>], // Regular bookshelf Collection
     //    // other standard Collection attributes
     //    ...
     //    pagination: {
     //        rowCount: 53, // Total number of rows found for the query before pagination
     //        pageCount: 4, // Total number of pages of results
     //        page: 3, // The requested page number
     //        pageSize: 15, // The requested number of rows per page
     //
     //  // OR, if limit/offset pagination is used instead of page/pageSize:
     //        // offset: 30, // The requested offset
     //        // limit: 15 // The requested limit
     //    }
     // }

  },


  getNewPostForm : function(req, res, next) {
    res.render('posts/new', {
      title: 'Posts'
    });
  },

  getPostbyId : function(req, res, next) {

    PostsDB.forge({id: req.params.id})
    .fetch()
    // .fetch({withRelated: ['categories', 'tags']})
    .then(function (post) {
      if (!post) {
        // res.status(404).json({error: true, data: {}});
        req.flash('error', messages.E404);
        res.status(404).render("error");
      }
      else {
        res.render('posts/read',{data: post.toJSON(), title:"Posts"});
      }
    })
    .catch(function (err) {
      req.flash('error', messages.E500);
      res.status(500).render('error');
    });
  },

  putPostbyId : function(req, res, next) {
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
  },

  postNewPost : function(req, res, next) {
    req.assert('title', 'Title cannot be blank').notEmpty();
    req.assert('mdbody', 'Body cannot be blank').notEmpty();
    req.assert('htmlbody', 'Body cannot be blank').notEmpty();
    req.assert('tags', 'Tags cannot be blank').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
      req.flash('error', errors);
      res.status(301).redirect('/account/posts/new');
    }
    // old code using showdown to parse markdown
    // var text      = req.body.body;
    // var showdown  = require('showdown');
    // var converter = new showdown.Converter();
    // // .setOption('optionKey', 'value');
    // var html      = converter.makeHtml(text);

    var slug = require('slug');

    new PostsDB({
      title: req.body.title,
      slug: slug(req.body.title),
      // body: req.body.body,  // removed for economy
      markdown:req.body.mdbody,
      html:req.body.htmlbody,
      tags: req.body.tags,
      user_id: req.user.id
    }).save()
    .then(function(saved) {
      console.log(saved.attributes.id);
      req.flash('success', { msg: 'New post have been saved.' });
      res.status(301).redirect('/account/posts');
    })
    .catch(function(err) {
      if (err.code) {
        console.log(err.detail);
        req.flash('error', {msg:"error"});
        res.status(500).redirect('/account/posts/new');
      }
    });
  }
}
