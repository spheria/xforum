var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var exphbs = require('express-handlebars');
var passport = require('passport');
// var Pool = require('pg-pool');

// Load environment variables from .env file
dotenv.load();

// Passport OAuth strategies
require('./config/passport');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON : function(object) {
      return JSON.stringify(object);
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 7777);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));

// app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
var RedisStore = require('connect-redis')(session);
var redisConfig = {
    db: parseInt(process.env.REDIS_DB_KEY) || 123,
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379
};
app.use(session({
 store: new RedisStore(redisConfig),
 secret: process.env.SESSION_SECRET,
 saveUninitialized: true,
 resave: false,
 cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));
app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('Redis Session is not Working. Please Contact Admin.')) // handle error
  }
  next() // otherwise continue
})

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user ? req.user.toJSON() : null;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(require("./routes"))

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
