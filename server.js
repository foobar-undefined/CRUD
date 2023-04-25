// Load express
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
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
//configure passport
require('./config/passport');


//mount middleware (app.use)
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));     // this creates req.body from an HTML form submission
//use of resave & saveUninitialized settings
//app.use(cookieParser());
app.use(methodOverride('_method'));


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
//mount passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

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