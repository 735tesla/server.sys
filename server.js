// server.js

// BASE SETUP
// =============================================================================

// call the packages we need

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database('database');

var Client     = require('./app/models/client');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// <-- route middleware and first route are here

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/client')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

    	console.log(req.query);

    	console.log('1');
        
        var client = new Client(req.query.name, req.query.uuid); 

        console.log('2');
        res.json({ message: 'Client created!' });

        // save the bear and check for errors
        /*client.save(function(err) {
        	console.log('3');
            if (err)
            	console.log('4');
                res.send(err);
			console.log('5');
            res.json({ message: 'Client created!' });
        });*/
        
    });

router.route('/clients').get(function(req, res) {

        db.each("SELECT * FROM clients", function(err, row) {
    		console.log(row.name);
  		});
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);