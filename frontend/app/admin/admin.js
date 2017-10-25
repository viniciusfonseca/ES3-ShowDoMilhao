/**
 * Created by Pinipa on 20/10/2017.
 */

angular.module('myApp.admin', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'adminCtrl'
        });
    }])

    .controller('adminCtrl', function ($scope) {
        $scope.data = {};
        $scope.submit = function (url){
            $scope.data.crud = url;
            alert(JSON.stringify($scope.data));
        }
    });
