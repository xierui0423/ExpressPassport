/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Club', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'userId',
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        players: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            field: 'players',
            allowNull: true
        },
        balance: {
            type: DataTypes.INTEGER,
            field: 'balance',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'Club',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Club = model.Club;
    const User = model.User;

    Club.belongsTo(User, {
        as: 'User',
        foreignKey: 'userId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
