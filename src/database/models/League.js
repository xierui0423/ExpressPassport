/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('league', {
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
		}
	}, {
		tableName: 'League',
		timestamps: false
	});
};
