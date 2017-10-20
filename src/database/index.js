import db from './database';

export default db;

export const models = {

  user: {
    User: db.import('./models/User'),
  },

  market: {
    League: db.import('./models/League'),
    Team: db.import('./models/Team'),
    Player: db.import('./models/Player'),
  },

};
