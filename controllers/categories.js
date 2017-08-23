var moment = require('moment');
var CategoriesDB = require('../models/Categories');
var messages = require('../config/responses');

exports.createNewCategoriesForm = (req, res, next) => {
  res.render('categories/new', {title:"Categories"});
};

exports.createCategories = (req, res, next) => {
  var  user_id = req.user.id;
  CategoriesDB.forge({
      name: req.body.name,
      user_id: user_id
    })
    .save()
    .then(function (data) {
      console.log(data);
      req.flash('success', { msg: 'New category have been saved.' });
      res.status(200).redirect('/categories/list', {title:"Categories"});
      // res.json({error: false, data: {id: user.get('id')}});
    })
    .catch(function (err) {
      // res.status(500).json({error: true, data: {msg: err.message}});
      req.flash('error', messages.E500);
      res.status(500).render('error');
    });
};
exports.getCategories = (req, res, next) => {
  CategoriesDB.forge()
  .fetchAll()
  .then(function (collection) {
    if (!collection || collection == [] ) {
      req.flash('error', {msg:"We dont have any category yet"});
      res.render('categories/list', {data:[], title:"Categories"});
    }
    else {
      res.render('categories/list', {data:collection.toJSON(), title:"Categories"});
      //  res.json({error: false, data: category.toJSON()});
    }
  })
  .catch(function (err) {
    //  res.status(500).json({error: true, data: {msg: err.message}});
    req.flash('error', messages.E500);
    res.status(500).render('error');
  });
};
exports.getCategoriesId = (req, res, next) => {
  CategoriesDB.forge({id: req.params.id})
  .fetch()
  .then(function (category) {
    if(!category) {
      res.status(404).json({error: true, data: {}});
    }
    else {
      res.json({error: false, data: category.toJSON()});
    }
  })
  .catch(function (err) {
    //  res.status(500).json({error: true, data: {msg: err.message}});
    req.flash('error', messages.E500);
    res.status(500).render('error');
  });
};
exports.putCategoriesId = (req, res, next) => {
  CategoriesDB.forge({id: req.params.id})
  .fetch({require: true})
  .then(function (category) {
    category.save({name: req.body.name || category.get('name')})
    .then(function () {
      res.json({error: false, data: {msg: 'Category updated'}});
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
exports.deleteCategoriesbyId = (req, res, next) => {
  CategoriesDB.forge({id: req.params.id})
  .fetch({require: true})
  .then(function (category) {
    category.destroy()
    .then(function () {
      res.json({error: true, data: {msg: 'Category successfully deleted'}});
    })
    .catch(function (err) {
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
