/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('League', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'League',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const League = model.League;
    const Team = model.Team;

    League.hasMany(Team, {
        as: 'TeamLeagueidFkeys',
        foreignKey: 'leagueId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
