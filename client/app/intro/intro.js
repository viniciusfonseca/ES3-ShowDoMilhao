angular.module('myApp.intro', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider.when('/intro', {
        templateUrl: 'intro/intro.html',
        controller: 'introCtrl'
    });
})

.controller('introCtrl', function($scope, $location, $rootScope){
    $scope.goToMap = function() { $location.path('/map') }
    $rootScope.game = {
        continents: {
            'north_america': 0,
            'europa': 0,
            'asia': 0,
            'south_america': 0,
            'africa': 0,
            'oceania': 0
        }
    }
    localStorage.setItem('game', JSON.stringify($rootScope.game))
})