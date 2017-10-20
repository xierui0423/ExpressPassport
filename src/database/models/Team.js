/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('team', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'name'
		},
		leagueId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'League',
				key: 'id'
			},
			field: 'leagueId'
		}
	}, {
		tableName: 'Team',
		timestamps: false
	});
};
