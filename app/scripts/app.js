'use strict';

angular.module('ttcMapperApp', ["ui.router", "leaflet-directive", "geolocation"])
  .config(function ($stateProvider, $urlRouterProvider) {
    // Default Route
    $urlRouterProvider.otherwise("/");
    // Now set up the states
    $stateProvider
      .state('map', {
        url: "/",
        templateUrl: "views/main.html",
        controller: "MainCtrl"
      })
  })
  .config(function($httpProvider) {
    $httpProvider.defaults.headers["Accept"] = "*/*";
  });
