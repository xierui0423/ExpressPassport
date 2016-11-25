/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'name'
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'age'
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'password'
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'salt'
		}
	}, {
		tableName: 'User',
		timestamps: false
	});
};
