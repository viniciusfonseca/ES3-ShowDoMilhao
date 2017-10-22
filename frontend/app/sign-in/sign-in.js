/**
 * Created by Pinipa on 20/10/2017.
 */

angular.module('myApp.signIn', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sign-in', {
            templateUrl: 'sign-in/sign-in.html',
            controller: 'signInCtrl'
        });
    }])

    .controller('signInCtrl', function($scope) {

    });
