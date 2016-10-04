// dependencies
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;


var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database

var Car = require('./models/car.js');
// user schema/model
var User = require('./models/user.js');

// create instance of express
var app = express();

// require routes
var routes = require('./routes/api.js');
var reservation_routes = require('./routes/reservationAPI.js');
var car_routes = require('./routes/carAPI.js');

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../bower_components')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', routes);
app.use('/reservation/', reservation_routes);
app.use('/car/', car_routes);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.get('/profile', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'profile.html'));
});

app.get('/connexion', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'SignUp.html'));
});

app.get('/listCar', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'ListMyCar.html'));
});

app.get('/inscription', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'Subscribe_CarRenter.html'));
});
app.get('/reserve', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'reservation.html'));
});
// error hndlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

module.exports = app;
