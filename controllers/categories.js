var moment = require('moment');
var CategoriesDB = require('../models/Categories');

exports.getCategories = (req, res, next) => {
  CategoriesDB.forge({
      name: req.body.name,
    })
    .save()
    .then(function (user) {
      res.json({error: false, data: {id: user.get('id')}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {msg: err.message}});
    });
};
exports.getCategories = (req, res, next) => {
  CategoriesDB.forge()
   .fetchAll()
   .then(function (category) {
     if(!category) {
       res.status(404).json({error: true, data: {}});
     }
     else {
       res.json({error: false, data: category.toJSON()});
     }
   })
   .catch(function (err) {
     res.status(500).json({error: true, data: {msg: err.message}});
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
     res.status(500).json({error: true, data: {msg: err.message}});
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
       res.status(500).json({error: true, data: {msg: err.message}});
     });
   })
   .catch(function (err) {
     res.status(500).json({error: true, data: {msg: err.message}});
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
        res.status(500).json({error: true, data: {msg: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {msg: err.message}});
    });
};
