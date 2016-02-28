var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database');

db.serialize(function() {
	db.run(
		'CREATE TABLE IF NOT EXISTS clients \
		( \
			uuid TEXT UNIQUE NOT NULL, \
			name TEXT DEFAULT ""(unnamed)", \
			created DATETIME DEFAULT CURRENT_TIMESTAMP, \
			modified DATETIME DEFAULT CURRENT_TIMESTAMP \
		)'
	);
});

db.close();
