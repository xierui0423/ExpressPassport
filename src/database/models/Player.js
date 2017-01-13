/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('player', {
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
		heigth: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'heigth'
		},
		weight: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'weight'
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'User',
				key: 'id'
			},
			field: 'userId'
		}
	}, {
		tableName: 'Player',
		timestamps: false
	});
};
