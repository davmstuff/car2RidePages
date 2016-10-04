var module = angular.module('Car2Ride',[]);

module.controller('MapCtrl',function ($scope,$http,$location) {

	var region = $location.search().region ;
	$http.get('/car/getAll').then(function(response)
	{
		$scope.cars = response.data.cars;
		var cars = response.data.cars;
		var mapOptions = {
		  zoom: 13,
		  center: new google.maps.LatLng(user_position.lat, user_position.long),
		  mapTypeId: google.maps.MapTypeId.TERRAIN
		}
		
		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		
		$scope.markers = [];
		
		var user_location_marker = new google.maps.Marker({
			map: $scope.map,
			position: new google.maps.LatLng(user_position.lat, user_position.long),
			title: "You are here",
			icon: "images/car.png",
			blop: "here we go"
		  });
		  
		  $scope.map.panTo(new google.maps.LatLng(user_position.lat, user_position.long));

		var infoWindow = new google.maps.InfoWindow();
		var createMarker = function(info) {

		  var marker = new google.maps.Marker({
			map: $scope.map,
			position: new google.maps.LatLng(info['latitude'], info['longitude']),
			title: info['car']+' '+info['model'],
			icon: "images/loc.png"
		  });
		  marker.content = '<div class="infoWindowContent">'
		  +'<img src= "images/myCar.jpg" />'
		  +'</div>';
		  google.maps.event.addListener(marker, 'click', function() {
			//$scope.map.setCenter(new google.maps.LatLng(info.lat, info.long));
			infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
			infoWindow.open($scope.map, marker);
			//updateForm(marker.title);
			document.getElementById(marker.title).click();
			google.maps.event.addListener(infoWindow,'closeclick',function(){
			$scope.map.panTo(new google.maps.LatLng(user_position.lat, user_position.long));
			});
		  });
		  
		  $scope.markers.push(marker);
		  
		}
		var cars = $scope.cars;
		var updateForm = function(title)
		{
		  for (i = 0; i < cars.length; i++) 
			{
			var t = cars[i].car+' '+cars[i].model;
				if(title === t)
				{
				$scope.car_brand = cars[i]['car'];
				$scope.car_model = cars[i]['model'];
				$scope.car_year = cars[i]['year'];
				$scope.car_price = cars[i]['price'];
				$scope.car_odometer = cars[i]['odometer'];
				$scope.car_address = cars[i]['address'];
				}
			}	
		}
		for (i = 0; i < cars.length; i++) {
		  createMarker(cars[i]);
		}

		$scope.openInfoWindow = function(e, selectedMarker) {
		  //e.preventDefault();
		  google.maps.event.trigger(selectedMarker, 'click');
		  updateForm(selectedMarker.title);
		}
	});
  });