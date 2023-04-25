// Load express
const express = require('express');
const logger = require('morgan');
const indexRoutes = require('./routes/index');
const songRoutes = require('./routes/songs');
const commentsRoutes = require('./routes/comments');

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
app.use('/', indexRoutes);
app.use('/songs', songRoutes);
app.use('/', commentsRoutes);

app.use('*', (req, res) => {
    res.render('404', {title: '404 - Page Not Found'})
});

//Listen on port 3000 for HTTP request from clients
app.listen(3000, () => {
    console.log('Listening on port 3000');
});