/**
 * Created by Pinipa on 20/10/2017.
 */

angular.module('myApp.signUp', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sign-up', {
            templateUrl: 'sign-up/sign-up.html',
            controller: 'signUpCtrl'
        });
    }])

    .controller('signUpCtrl', function($scope) {

        $scope.user = {
            avatar : "download.png",
            balloon : "balloon.png"
        };

        $scope.avatarData = [
            "download.png",
            "download(1).png",
            "download(2).png",
            "download(3).png",
            "download(4).png",
            "download(5).png"
        ];

        $scope.balloonData = [
            "balloon.png",
            "balloon(1).png",
            "balloon(2).png",
            "balloon(3).png",
            "balloon(4).png",
            "balloon(5).png"
        ];
    });
