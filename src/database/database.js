/**
 * Created by ray.xie on 11/11/2016.
 */
import Sequelize from 'sequelize';
import config from '../config/config';

export default new Sequelize(config.database.connectionString);

