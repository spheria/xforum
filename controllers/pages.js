var moment = require('moment');
var PagesDB = require('../models/Pages');
var messages = require('../config/responses');

exports.createNewPagesForm = (req, res, next) => {
  res.render('pages/new');
};

exports.createPages = (req, res, next) => {
  var  user_id = req.user.id;
  PagesDB.forge({
      name: req.body.name,
      user_id: user_id
    })
    .save()
    .then(function (data) {
      // console.log(data);
      req.flash('success', { msg: 'New page have been saved.' });
      res.status(200).redirect('/pages/list');
      // res.json({error: false, data: {id: user.get('id')}});
    })
    .catch(function (err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        req.flash('error', { msg: 'The page you have entered is already associated with another account.' });
        return res.status(301).redirect('/pages/new');
      }
      // show existing like pages

      // res.status(500).json({error: true, msg: err.message});
      res.status(500).render('error', {error:err.error});
    });
};
exports.getPages = (req, res, next) => {
  PagesDB.forge()
  .fetchAll()
  .then(function (collection) {
    if (!collection || collection == [] ) {
      req.flash('error', {msg:"We dont have any page yet"});
      res.render('pages/list', {data:err});
    }
    else {
      res.render('pages/list', {data:collection.toJSON()});
      //  res.json({error: false, data: page.toJSON()});
    }
  })
  .catch(function (err) {
    //  res.status(500).json({error: true, data: {msg: err.message}});
    req.flash('error', messages.E500);
    res.status(500).render('error');
  });
};
exports.getPagesId = (req, res, next) => {
  PagesDB.forge({id: req.params.id})
  .fetch()
  .then(function (page) {
    if(!page) {
      res.status(404).json({error: true, data: {}});
    }
    else {
      res.json({error: false, data: page.toJSON()});
    }
  })
  .catch(function (err) {
    //  res.status(500).json({error: true, data: {msg: err.message}});
    req.flash('error', messages.E500);
    res.status(500).render('error');
  });
};
exports.putPagesId = (req, res, next) => {
  PagesDB.forge({id: req.params.id})
  .fetch({require: true})
  .then(function (page) {
    page.save({name: req.body.name || page.get('name')})
    .then(function () {
      res.json({error: false, data: {msg: 'Page updated'}});
    })
    .catch(function (err) {
      //  res.status(500).json({error: true, data: {msg: err.message}});
      req.flash('error', messages.E500);
      res.status(500).render('error');
    });
  })
  .catch(function (err) {
    //  res.status(500).json({error: true, data: {msg: err.message}});
    req.flash('error', messages.E500);
    res.status(500).render('error');
  });
};
exports.deletePagesbyId = (req, res, next) => {
  PagesDB.forge({id: req.params.id})
  .fetch({require: true})
  .then(function (page) {
    page.destroy()
    .then(function () {
      res.json({error: true, data: {msg: 'Page successfully deleted'}});
    })
    .catch(function (err) {
      req.flash('error', messages.E500);
      res.status(500).render('error', {error:err});
    });
  })
  .catch(function (err) {
    //  res.status(500).json({error: true, data: {msg: err.message}});
    req.flash('error', messages.E500);
    res.status(500).render('error');
  });
};
