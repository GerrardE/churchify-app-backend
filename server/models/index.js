import path from 'path';
import Sequelize from 'sequelize';
import fs from 'fs';
import * as configPath from '../config/database_config';


const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configPath[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  const {
    database,
    username,
    password,
    ...otherConfig
  } = config;
  sequelize = new Sequelize(database, username, password, {
    ...otherConfig
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
