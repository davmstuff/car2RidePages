var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var Car = require('../models/car.js');
var Resrvation = require('../models/reservation.js');


router.post('/create', function (req, res) {
                    return res.status(200).json({
                        status: 'data proceeded successful!',
						renter: req.body.renter,
						car: req.body.car,
                    });
                });

router.post('/update', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!'
            });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.get('/get', function (req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});


module.exports = router;