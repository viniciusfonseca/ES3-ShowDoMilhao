'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'ngAria',
  'ngAnimate',
  'myApp.signUp',
  'myApp.signIn',
  'myApp.map',
  'myApp.quiz',
  'myApp.shop',
  'myApp.admin',

  'myApp.user',
  'myApp.api',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/sign-in'});
}]);
