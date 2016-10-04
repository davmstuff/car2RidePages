// car model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CarSchema = new Schema({
  car: String,
  model: String,
  year: Number,
  price: Number,
  address: String,
  longitude: String,
  latitude: String,
  region : String,
  odometer: Number,
  available_date_begin: String,
  available_date_end: String,
  need_confirm :Boolean,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});

var Car = mongoose.model('cars', CarSchema);

// make this available to our users in our Node applications
module.exports = Car;
