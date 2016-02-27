var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database');

db.serialize(function() {
	db.run("CREATE TABLE clients (uuid, name)")
});

db.close();