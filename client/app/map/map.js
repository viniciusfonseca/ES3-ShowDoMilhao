/**
 * Created by Pinipa on 20/10/2017.
 */

angular.module('myApp.map', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: 'map/map.html',
            controller: 'mapCtrl'
        });
    }])

    .controller('mapCtrl', function($scope, $rootScope, $location) {
        var continents = [
            'south_america',
            'north_america',
            'europa',
            'oceania',
            'africa',
            'asia'
        ]

        var continentsMax = {
            'south_america': 5,
            'north_america': 6,
            'europa': 7,
            'oceania': 5,
            'africa': 4,
            'asia': 3
        }

        $rootScope.game.continents = $rootScope.game.continents || []

        $scope.clickEvent = function(event) {
            if (continents.indexOf(event.target.id) !== -1) {
                $rootScope.game.continent = event.target.id
                $rootScope.game.questionCount = 0
                localStorage.setItem('game', JSON.stringify($rootScope.game))
                $location.path('/quiz')
            }
        }
    });
