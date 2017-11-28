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

        $scope.continentsMax = {
            'south_america': 5,
            'north_america': 6,
            'europa': 7,
            'oceania': 5,
            'africa': 4,
            'asia': 3
        }

        $scope.continentsPos = {
            'south_america': "top:390px;left:370px;",
            'north_america': "top:175px;left:200px;",
            'europa': "top:150px;left:670px;",
            'oceania': "top:440px;left:1130px;",
            'africa': "top:300px;left:680px;",
            'asia': "top:150px;left:950px;"
        }

        var endGame = continents.every(function(continent) {
            return $rootScope.game.continents[continent] >= $scope.continentsMax[continent]
        })

        if (endGame) {
            alert('Fim de jogo! Seu placar final: ' + $rootScope.user.pontos)
            localStorage.setItem('user',JSON.stringify($rootScope.user))
            $location.path('/intro')
        }

        $rootScope.game.continents = $rootScope.game.continents || {}

        $scope.clickEvent = function(event) {

            var continent = event.target.id
            if (continents.indexOf(continent) !== -1) {

                if ($rootScope.game.continents[continent] >= $scope.continentsMax[continent]) {
                    alert('Você já coletou as estrelas deste continente!')
                    return
                }

                $rootScope.game.continent = continent
                $rootScope.game.questionCount = 0
                localStorage.setItem('game', JSON.stringify($rootScope.game))
                $location.path('/quiz')
            }
        }
    });
