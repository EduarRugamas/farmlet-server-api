const express = require('express');
const morgan = require('morgan');
const { Client } = require('pg');
const config =  require('./app/config/config');
const sequelize = require('./app/db');
const passport = require('passport');
const httpStatus = require('http-status')
const {jwtStrategy} = require('./app/config/passport');
const CodesError = require('./app/utils/CodesError');
const cors = require('cors');
const app = express();
const routes = require('./app/routes');

let server;
const env = process.env.NODE_ENV || 'development';
const database_url = config[env].url;

 const client = new Client({
     connectionString: database_url
 });

 client.connect().then( ()=> {
     console.log('conectado a la base de datos postgre');

     sequelize.authenticate().then( ()=> {

         console.log('sequelize inicializado');

         server = app.listen(config.port, ()=> {
            console.log(`Server init PORT -> ${config.port}`);
            console.log('https://localhost:5003/v1/');
         });
     }).catch( (error) => {
        console.log(`Error al conectar a la base de datos postgres-> ${error}`);
        console.log('sequelize no iniciado');
     });
 });

 app.use(express.json());
 app.use(express.urlencoded( {extended: true} ));

 app.use(cors());
 app.options('*', cors());

 app.use(morgan('dev'));

 app.use(passport.initialize());
 passport.use('jwt', jwtStrategy);


 if (config.env === 'production'){
     app.use('/v1', routes);
 }else if(config.env === 'development'){
     app.use('/v1', routes);
 }

app.use((req, res, next) => {
    next(new CodesError(httpStatus.NOT_FOUND, 'Not found'));
});
