/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Team', {
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
        },
        leagueId: {
            type: DataTypes.INTEGER,
            field: 'leagueId',
            allowNull: false,
            references: {
                model: 'League',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'public',
        tableName: 'Team',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Team = model.Team;
    const Player = model.Player;
    const League = model.League;

    Team.hasMany(Player, {
        as: 'PlayerTeamidFkeys',
        foreignKey: 'teamId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Team.belongsTo(League, {
        as: 'League',
        foreignKey: 'leagueId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
