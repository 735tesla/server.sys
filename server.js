// server.js

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database('database');

var Client     = require('./app/models/client');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.cookieParser());
app.use(express.session({secret: 'CHANGEME'}));

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
    if (req.session.auth === true) {
      next();
    } else {
      res.writeHead(403);
      res.send(JSON.stringify({
        success: false,
        error: 'Not authenticated'
      }));
      res.end();
    }
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/client')
    .post(function(req, res) {

    	console.log(req.query);

    	console.log('1');

        var client = new Client(req.query.name, req.query.uuid);

        console.log('2');
        res.json({ message: 'Client created!' });
    });

router.route('/clients').get(function(req, res) {

        db.each("SELECT * FROM clients", function(err, row) {
    		console.log(row.name);
  		});
    });


app.use('/api', router);


app.listen(port);
console.log('Server listening on port ' + port);
