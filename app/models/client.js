var Client = sequelize.define('client', {
		uuid: {
			type: Sequelize.STRING,
			field: 'uuid',
			unique: true,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING,
			field: 'name',
			defaultValue: '(unnamed)'
		}
}, {
	underscored: true
});

module.exports = Client;
