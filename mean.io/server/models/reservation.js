// reservation model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReservationSchema = new Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'cars' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

var Reservation = mongoose.model('reservations', ReservationSchema);

// make this available to our users in our Node applications
module.exports = Reservation;
