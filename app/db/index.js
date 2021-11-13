const {Sequelize} = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const databaseUrl = config[env].url;
const poolConfig = config.dbPool[env];

const sequelize = new Sequelize(databaseUrl, {logging: false, pool: poolConfig});

module.exports = sequelize;
