/**
 * Created by Pinipa on 20/10/2017.
 */

angular.module('myApp.shop', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/shop', {
            templateUrl: 'shop/shop.html',
            controller: 'shopCtrl'
        });
    }])

    .controller('shopCtrl', function ($scope, $mdDialog) {

    });
