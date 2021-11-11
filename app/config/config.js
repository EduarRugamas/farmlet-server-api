const dotev = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotev.config( {path: path.join(__dirname, '../../.env') } );

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development').required(),
        PORT: Joi.number().default(5000),
        DATABASE_URL: Joi.string().required().description('url databases'),
        JWT_SECRET: Joi.string().required().description('JWT auth secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire')
    }).unknown();

const {value: envVars, error} = envVarsSchema.prefs( { errors: { label: 'key' } } ).validate(process.env);

if (error){
    console.log(`Configuracion invalida error ->: ${error}`);
    console.log('archivo de file -> /config/config.js');
    throw new Error(`Configuracion invalida error ->: ${error}`);
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
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: 10
    },
    dbPool: {
        production: { idle: 10000, acquire: 60000, evict: 1000 },
        development: {idle:10000, acquire:60000, evict:1000}
    }
};
