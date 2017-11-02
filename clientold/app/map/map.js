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

    .controller('mapCtrl', function($scope) {

    });
