import db from './database';
import md from './models';

md.init(db);

export default db;

export const models = md;
