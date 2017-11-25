angular.module('myApp.intro', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider.when('/intro', {
        templateUrl: 'intro/intro.html',
        controller: 'introCtrl'
    });
})

.controller('introCtrl', function($scope, $location){
    $scope.goToMap = function() { $location.path('/map') }
})