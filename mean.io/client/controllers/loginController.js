var app = angular.module('Car2Ride',[]);
app.controller('loginController',
        ['$scope','$location', 'AuthService','$window',
            function ($scope, $location, AuthService,$window) {

                $scope.login = function () {
					$scope.myTxt = "You clicked submit!";
                    // initial values
                    $scope.error = false;
                    $scope.disabled = true;

                    // call login from service
                    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                            // handle success
                            .then(function () {
                                //$location.path('/zabuza');
								$window.location.href = '/zabuza';
                                $scope.disabled = false;
                                $scope.loginForm = {};
                            })
                            // handle error
                            .catch(function () {
                                $scope.error = true;
                                $scope.errorMessage = "Invalid username and/or password";
                                $scope.disabled = false;
                                $scope.loginForm = {};
                            });

                };

            }]);