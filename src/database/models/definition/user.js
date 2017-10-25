/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            field: 'username',
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(64),
            field: 'password',
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING(36),
            field: 'salt',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'User',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const User = model.User;
    const Club = model.Club;

    User.hasMany(Club, {
        as: 'ClubUseridFkeys',
        foreignKey: 'userId',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
