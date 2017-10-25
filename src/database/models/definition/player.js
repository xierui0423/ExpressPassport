/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Player', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: true
        },
        position: {
            type: DataTypes.INTEGER,
            field: 'position',
            allowNull: true,
            comment: '0 - GK, 1 - DF, 2 - MD, 3 - FW'
        },
        teamId: {
            type: DataTypes.INTEGER,
            field: 'teamId',
            allowNull: true,
            references: {
                model: 'Team',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        value: {
            type: DataTypes.INTEGER,
            field: 'value',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'Player',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Player = model.Player;
    const Team = model.Team;

    Player.belongsTo(Team, {
        as: 'Team',
        foreignKey: 'teamId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
