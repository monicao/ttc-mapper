'use strict';

angular.module('ttcMapperApp')
  .controller('MainCtrl', function ($scope, Nextbus, geolocation, $timeout) {
    // Set up the map
    $scope.map = {
      center: {lat: 43.7, lng: -79.4, zoom: 14},
      markers: {},
      defaults: {
          scrollWheelZoom: false
      }
    }

    // Center the map to the geolocated lat, long
    $scope.coords = geolocation.getLocation().then(function(data){
      $scope.map.center.lat = data.coords.latitude;
      $scope.map.center.lng = data.coords.longitude;
    })

    // Update the map every 15 seconds
    var updateMap = function() {
      $timeout(function(){ $scope.getVehicles()}, 15000);
      resetSecondsUntilUpdate()
    } 

    var resetSecondsUntilUpdate = function() {
      $scope.secondsUntilUpdate = 15
      decrementSecondsUntilUpdate()
    }
    
    var decrementSecondsUntilUpdate = function() {
      if($scope.secondsUntilUpdate >= 1) {
        $scope.secondsUntilUpdate -= 1
        $timeout(decrementSecondsUntilUpdate, 1000)
      }
    }

    function isValidRouteID() {
      return (typeof($scope.routeID) !== "undefined" && !isNaN(parseInt($scope.routeID)))
    }

    $scope.changeRoute = function() {
      $scope.map.markers = []
      $scope.secondsUntilUpdate = 15;
      $scope.getVehicles()
    }

    $scope.getVehicles = function(){
      if(!isValidRouteID()) return;
      Nextbus.getVehicleLocations($scope.routeID, function(markers, lastTime) {
        console.log("markers", markers);
        _.each(markers, function(marker) {
          $scope.map.markers[marker.id] = {lat: marker.lat, lng: marker.lon, message: marker.routeTag + "(" + marker.dirTag + ")"};
        });
      });
      updateMap();
    };
  });
