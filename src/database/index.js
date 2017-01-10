import db from './database';

export default db;

export const models = {

  user:
  {
    User: db.import('./models/User'),
  },


};
