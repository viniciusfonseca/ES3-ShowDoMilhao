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
])
.run(function($rootScope) {
  var user = localStorage.getItem('user')
  var token = localStorage.getItem('token')
  var game = localStorage.getItem('game')

  console.log('user',user)
  console.log('token',token)

  if (token) {
    try {
      $rootScope.user = JSON.parse(user)
      $rootScope.token = token
      $rootScope.game = game
    }
    catch(e) {}
  }
})
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/sign-in'});
}]);
