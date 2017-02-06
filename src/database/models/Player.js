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
		height: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'height'
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
		},
		speed: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'speed'
		},
		agility: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'agility'
		},
		strength: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'strength'
		},
		pass: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'pass'
		},
		control: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'control'
		},
		tackle: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'tackle'
		},
		head: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'head'
		},
		shoot: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'shoot'
		},
		flair: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'flair'
		},
		experience: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'experience'
		}
	}, {
		tableName: 'Player',
		timestamps: false
	});
};
