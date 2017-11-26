angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'registerCtrl'
    });
}])

.controller('registerCtrl', function($scope, User, $location) {

    $scope.back = function() {
        $location.url('/sign-in')
    }
})