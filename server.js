// server.js

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
Sequelize = require('sequelize');
sequelize = new Sequelize('sqlite://sys.db');
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
  if (req.session.auth === true || req.url.match('^/(authenticate)(/|)$')) {
    next();
  } else {
    req.session.auth = false;
    res.send(JSON.stringify({
      success: false,
      error: 'Not authenticated'
    }));
    res.end();
  }
});

router.route('/authenticate')
  .post(function(req, res) {
    var resp = {};
    if (req.session.auth !== true) {
      var data = req.body;
      if (data.uuid !== undefined) {
        if (data.uuid.match('[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}')) {
          req.session.auth = true;
          var that = this;
          Client.findOrCreate({
            where: {
              uuid: data.uuid
            }
          }).spread(function(client) {
            // Do something with client
          });
          resp = {
            success: true,
          };
        } else {
          resp = {
            success: false,
            error: 'Invalid UUID',
            uuid: data.uuid
          };
        }
      } else {
        resp = {
          success: false,
          error: 'Missing UUID'
        };
      }
    } else {
      resp = {
        success: true,
        error: 'Already authenticated'
      };
    }
    res.end(JSON.stringify(resp));
  });

router.route('/test')
  .get(function(req, res) {
    res.end(JSON.stringify({
      success: true,
      message: 'Hello World!'
    }));
  });

app.use('/api', router);

app.listen(port);
console.log('Server listening on port ' + port);
