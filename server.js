// Load express
const express = require('express');
const logger = require('morgan');

// create our express app
const app = express();

//app settings (app.set)
app.set('view engine', 'ejs');

//expose environment variables
require('dotenv').config();
// require an execute database config code
require('./config/database');

//mount middleware (app.use)
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));     // this creates req.body from an HTML form submission

//mount routes

//Listen on port 3000 for HTTP request from clients
app.listen(3000, () => {
    console.log('Listening on port 3000');
});