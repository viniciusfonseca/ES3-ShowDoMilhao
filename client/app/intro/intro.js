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
            'america': 0,
            'europa': 0,
            'asia': 0,
            'america do sul': 0,
            'africa': 0,
            'oceania': 0
        }
    }
})