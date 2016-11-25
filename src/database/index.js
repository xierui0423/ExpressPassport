/**
 * Created by ray.xie on 11/22/2016.
 */

import db from './database';

export default db;

export const models = {

  user:
  {
    User: db.import('./models/User'),
  },


};
