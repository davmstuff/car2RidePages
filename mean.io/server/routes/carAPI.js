var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/user.js');
var Car = require('../models/car.js');
var Reservation = require('../models/reservation.js');


router.get('/getAll', function (req, res) {
var allCars = Car.find({}, function(err, cars_) {
  if (err) throw err;
  console.log(cars_);
  console.log('ALL');
	  return res.json({
	  cars: cars_
                    });
  });
});

router.get('/getCarsInRegion', function (req, res) {
var allCars = Car.find({"address":req.query.region}, function(err, cars_) {
  if (err) throw err;
  console.log(cars_);
  console.log('IN '+req.query.region);
	  return res.json({
	  cars: cars_,
	  region: req.query.region
                    });
  });
});

module.exports = router;