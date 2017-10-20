/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('club', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'User',
				key: 'id'
			},
			field: 'userId'
		},
		players: {
			type: "ARRAY",
			allowNull: true,
			field: 'players'
		}
	}, {
		tableName: 'Club',
		timestamps: false
	});
};
