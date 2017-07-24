var express = require('express');
var router = express.Router();
var passport = require('passport');


// Controllers
var HomeController = require('./controllers/home');
var userController = require('./controllers/user');
var postsController = require('./controllers/post');
var categoriesController = require('./controllers/categories');
var contactController = require('./controllers/contact');

router.get('/', HomeController.index);
router.get('/theme', function(req, res){ res.render('theme')});
router.get('/contact', contactController.contactGet);
router.post('/contact', contactController.contactPost);

router.get('/signup', userController.signupGet);
router.post('/signup', userController.signupPost);
router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);
router.get('/forgot', userController.forgotGet);
router.post('/forgot', userController.forgotPost);
router.get('/reset/:token', userController.resetGet);
router.post('/reset/:token', userController.resetPost);
router.get('/logout', userController.logout);
router.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
router.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email profile repo' ] }));
router.get('/auth/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/login' }));




router.get('/account/profile', userController.ensureAuthenticated, userController.getAccount);
router.put('/account/profile', userController.ensureAuthenticated, userController.putAccount);
router.delete('/account/profile', userController.ensureAuthenticated, userController.deleteAccount);

router.get('/account/posts', userController.ensureAuthenticated, postsController.getAccountPosts);
router.get('/account/posts/new', userController.ensureAuthenticated, postsController.getNewPostForm);
router.post('/account/posts/new', userController.ensureAuthenticated, postsController.postNewPost);
router.get('/account/posts/read/:id', userController.ensureAuthenticated, postsController.getPostbyId);
router.post('/account/posts/edit/:id', userController.ensureAuthenticated, postsController.putPostbyId);

// categories
router.get('/categories/new', userController.ensureAuthenticated, categoriesController.createNewCategoriesForm);
router.post('/categories/new', userController.ensureAuthenticated, categoriesController.createCategories);
router.get('/categories/list', userController.ensureAuthenticated, categoriesController.getCategories);
router.get('/categories/:id', userController.ensureAuthenticated, categoriesController.getCategoriesId);
router.post('/categories/:id', userController.ensureAuthenticated, categoriesController.putCategoriesId);
router.delete('/categories/:id', userController.ensureAuthenticated, categoriesController.deleteCategoriesbyId);













module.exports = router;
