// server.js

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var sqlite3 = require('sqlite3').verbose();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('sqlite://database');
sequelize.sync();

var Client = require('./app/models/client');

app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'INSECURE AS HELL',
  resave: false,
  saveUninitialized: true,
}));

var port = process.env.PORT || 8080;
var router = express.Router();

router.use(function(req, res, next) {
    if (req.session.auth === true) {
      next();
    } else {
      res.send(JSON.stringify({
        success: false,
        error: 'Not authenticated'
      }));
      res.end();
    }
});

router.route('/authenticate')
  .post(function(req, res) {
    res.send(JSON.stringify({
      success: true
    }));
  });


app.use('/api', router);


app.listen(port);
console.log('Server listening on port ' + port);
