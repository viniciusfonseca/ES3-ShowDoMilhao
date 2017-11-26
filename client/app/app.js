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
  'myApp.register',
  'myApp.intro',

  'myApp.user',
  'myApp.api',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($rootScope, $locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  var user = localStorage.getItem('user')
  var token = localStorage.getItem('token')

  if (token) {
    $rootScope.user = user
    $rootScope.token = token
  }

  $routeProvider.otherwise({redirectTo: '/sign-in'});
}]);
