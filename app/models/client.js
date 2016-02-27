
var Client = function(name, uuid) {
	this.name = name;
	this.uuid = uuid;

	console.log('INSERT INTO clients (name, uuid) VALUES(\'' + this.name + '\', \'' + this.uuid + '\')');
	db.run('INSERT INTO clients (name, uuid) VALUES(\'' + this.name + '\', \'' + this.uuid + '\')');

	db.close();
};

module.exports = Client;