'use strict';

angular.module('ttcMapperApp')
  .service('Nextbus', function Nextbus($http) {
    var serviceURL = "http://webservices.nextbus.com/service/publicXMLFeed"
    var getMarkers = function(xmlData) {
      return _.map(xmlData.find("vehicle"), function(vehicle){
        var v = $(vehicle);
        return _.zipObject(
          ['id', 'lat', 'lon', 'routeTag', 'dirTag', 'secsSinceReport', 'predictable', 'heading'], 
          [parseInt(v.attr("id")), parseFloat(v.attr("lat")), parseFloat(v.attr("lon")), v.attr("routeTag"), v.attr("dirTag"), parseInt(v.attr("secsSinceReport")), (v.attr("predictable") === 'true'), parseInt(v.attr("heading"))]
        )
      })
    }

    var getLastTime = function(xmlData) {
      return parseInt(xmlData.find("lastTime").first().attr("time"))
    }

    this.getVehicleLocations = function(routeID, callback) {
      var callback = callback;
      var sinceTime = Date.now() - 15000;
      $http.get(serviceURL + "?a=ttc&command=vehicleLocations&r=" + routeID + "&t=" + sinceTime)
      .then(function(data) {
        var parsedXML = $($.parseXML(data.data));
        callback(getMarkers(parsedXML), getLastTime(parsedXML));
      }, // error
      function(data){
        console.log("there was an error: ", data); 
      });  
    }
  });
