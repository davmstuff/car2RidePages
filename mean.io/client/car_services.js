var module = angular.module('Car2Ride',[]);
module.factory('CarService',function ($q, $timeout, $http) {
                // return available functions for use in the controllers
                /*return ({
                    getAllCar: getAllCar,
                    /*getReservation: getReservation,
                    updateReservation: updateReservation,
                    cancelReservation: cancelReservation,
                    register: register
                });*/

                this.getAllCar = function getAllCar() {
				// create a new instance of deferred
                    var deferred = $q.defer();
					var cars;
                    // send a post request to the server
                   return $http.get('/car/getAll',
                            {renter: text1, car: text2})
                            // handle success
                            .success(function (data, status) {
                                if (status === 200 && data.status) {
									cars = data.cars;
                                    deferred.resolve();
                                } else {
                                    deferred.reject();
                                }
                            })
                            // handle error
                            .error(function (data) {
                                deferred.reject();
                            });
                }

            });