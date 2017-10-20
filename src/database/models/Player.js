/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('player', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'name'
		},
		position: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'position'
		},
		teamId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Team',
				key: 'id'
			},
			field: 'teamId'
		}
	}, {
		tableName: 'Player',
		timestamps: false
	});
};
