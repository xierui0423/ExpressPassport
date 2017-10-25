/* eslint global-require: "off" */
const model = {};
let initialized = false;

/**
 * Initializes sequelize models and their relations.
 * @param   {Object} sequelize  - Sequelize instance.
 * @returns {Object}            - Sequelize models.
 */
function init(sequelize) {
    delete module.exports.init; // Destroy itself to prevent repeated calls and clash with a model named 'init'.
    initialized = true;
    // Import model files and assign them to `model` object.
    model.Club = sequelize.import('./definition/club.js');
    model.League = sequelize.import('./definition/league.js');
    model.Player = sequelize.import('./definition/player.js');
    model.Team = sequelize.import('./definition/team.js');
    model.User = sequelize.import('./definition/user.js');

    // All models are initialized. Now connect them with relations.
    require('./definition/club.js').initRelations();
    require('./definition/league.js').initRelations();
    require('./definition/player.js').initRelations();
    require('./definition/team.js').initRelations();
    require('./definition/user.js').initRelations();
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
