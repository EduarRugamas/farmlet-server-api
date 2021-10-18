const dotev = require('dotenv');
const path = require('path');
const Joi = require('@hapi/joi');

dotev.config( {path: path.join(__dirname, '../../.env') } );

const envVar = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development').require(),
        PORT: Joi.number().default(5000),
        DATABASE_URL: Joi.string().require().description('url databases')
    }).unknown();

const {value: envVars, error} = envVar.prefs({error: {label: 'key'} } ).validate(process.env);

if (error){
    console.log(`Configuracion invalida error ->: ${error.message}`);
    console.log('archivo de file -> /config/config.js');
    throw new Error(`Configuracion invalida error ->: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    development: {
        url: envVars.DATABASE_URL,
        dialect: 'postgresql'
    },
    production: {
        url: envVars.DATABASE_URL,
        dialect: 'postgresql',
        dialectOptions: {
            ssl: true,
            rejectUnauthorized: false
        }
    },
    dbPool: {
        production: { idle: 10000, acquire: 60000, evict: 1000 },
        development: {idle:10000, acquire:60000, evict:1000}
    }
}
