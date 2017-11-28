/**
 * Created by Pinipa on 20/10/2017.
 */

angular.module('myApp.quiz', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/quiz', {
            templateUrl: 'quiz/quiz.html',
            controller: 'quizCtrl'
        });
    }])

    .controller('quizCtrl', function ($scope, $mdDialog, api, $http, $rootScope, $route, $location) {

        var intervalId = null

        var continentsMax = {
            'south_america': 5,
            'north_america': 6,
            'europa': 7,
            'oceania': 5,
            'africa': 4,
            'asia': 3
        }

        $scope.back = function() {
            $location.path('/map')
        }

        fetch(`${api}/comprar/list`, { headers: {'Authorization': 'Bearer ' + $rootScope.token } })
        .then(function(r) { return r.json() })
        .then(function(r) {
            console.log(r)
        })

        $scope.fetchQuestion = function() {
            fetch(`${api}/pergunta/random`, { headers: {'Authorization': 'Bearer ' + $rootScope.token } }).then(function(res){ return res.json() })
            .then(function(res) {
                console.log('RANDOM RESPONSE',res)

                $scope.quiz = res[0]
                $scope.timerem = 45

                intervalId = setInterval(function() {
                    $scope.timerem--
                    $scope.$apply()

                    if ($scope.timerem == 0) {

                    }
                }, 1000)
            })
        }

        $scope.mkArray = function(n) { return Array(n) }

        $scope.fromCharCode = function(n) { return String.fromCharCode(n) }

        $scope.fetchQuestion()

        $scope.quiz = {}
        $scope.msgAlt = 0

        $scope.getRetAltImg = function() {
            if ($scope.msgAlt == 1) { return 'url(assets/check.svg)' }
            if ($scope.msgAlt == 2) { return 'url(assets/wrong.png)' }
        }

        $scope.goShop = function() {
            $location.path('/shop')
        }
 
        $scope.submitAnswer = function() {
            if (!$scope.answer) { return }
            console.log('ANSWER', $scope.answer)

            fetch(`${api}/pergunta/${$scope.quiz.id_pergunta}/alternativa/${$scope.answer}`, { headers: {'Authorization': 'Bearer ' + $rootScope.token } })
            .then(function(r) { return r.json() })
                .then(function(res) {
                    var entry = Object.entries(res)[0]
                    var isCorrect = +(entry[0])
                    $scope.retAlt = entry[1]

                    $scope.msgAlt = isCorrect ? 1 : 2
                    console.log('RESPONSE ANSWER', res)
                    console.log('CONTINENT', $rootScope.game.continent)
                    $rootScope.game.continents[$rootScope.game.continent] += isCorrect ? 1 : 0
                    $rootScope.user.pontos += isCorrect ? 5 : (-10)

                    localStorage.setItem('game', JSON.stringify($rootScope.game))
                    $scope.$apply()

                    setTimeout(function() {
                        if ($rootScope.game.continents[$rootScope.game.continent] == continentsMax[$rootScope.game.continent]) {
                            $location.path('/map')
                        }
                        else {
                            $route.reload()
                        }
                    }, 1200)
                    
                })
        }

        $scope.isGameOver = function() {
            if ($rootScope.user.pontos <= 0) {
                $rootScope.user.pontos = 0
            }

        }

        $scope.pular = function() {
            $rootScope.user.pontos -= 5
            $route.reload()
        }

        $scope.leave = function() {
            $location.url('/sign-in')
        }

        $scope.helpScore = {
            card: -10,
            jump: -5,
            opinion: -8
        };

        $scope.showAdvanced = function (ev) {

            if ($scope.usedCard) { return }

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'quiz/cartas.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                scope: $scope,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    // $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog) {

            var b = true;
            $scope.helpCard = function (event) {
                if (b) {
                    angular.element(event.target).addClass('flipper');

                    var a = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
                    switch (a) {
                        case 0:
                            angular.element(event.target).addClass('zero');
                            break;
                        case 1:
                            angular.element(event.target).addClass('one');
                            break;
                        case 2:
                            angular.element(event.target).addClass('two');
                            break;
                        case 3:
                            angular.element(event.target).addClass('three');
                            break;
                    }
                    b = false;

                    $scope.data.help = "card";
                    $scope.data.score = $scope.helpScore[$scope.data.help];
                    $scope.data.card_number = a;

                    console.log('CARTA', $scope.data.card_number)
                    // alert(JSON.stringify($scope.data));
                    var alternatives = $scope.quiz.alternativas

                    var correctAlt = alternatives.filter(function(c) { return !!c.resposta })[0]
                    var incorrectAlt = alternatives.filter(function(c) { return !c.resposta })

                    for (var i = 0; i < +$scope.data.card_number; i++) {
                        incorrectAlt.pop()
                    }
                    incorrectAlt.push(correctAlt)
                    incorrectAlt.sort(function(a,b) {
                        if (a.id_alternativa < b.id_alternativa) { return -1 }
                        if (a.id_alternativa > b.id_alternativa) { return  1 }
                        return 0
                    })
                    $scope.quiz.alternativas = incorrectAlt

                    $scope.usedCard = true

                    setTimeout(function() {
                        $mdDialog.hide()
                        $scope.$apply()
                    }, 2000)
                }
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

        }

        $scope.goShop = function() {
            $mdDialog.show({
                controller: function($scope) {
                    $scope.hide = function() { $mdDialog.hide() }

                    $scope.comprar = function(id) {

                    }
                },
                clickOutsideToClose: true,
                template: `<div style="height: 300px" class="flex-row">
                    <md-card>
                        <md-card-title>
                            <md-card-title-text>
                                Carta
                            </md-card-title-text>
                        </md-card-title>
                        <md-card-actions layout="row" layout-align="end center">
                            <md-button>Comprar (R$0,50)</md-button>
                        </md-card-actions>
                    </md-card>
                    <md-card>
                        <md-card-title>
                            <md-card-title-text>
                                Pulo
                            </md-card-title-text>
                        </md-card-title>
                        <md-card-actions layout="row" layout-align="end center">
                            <md-button>Comprar (R$0,50)</md-button>
                      </md-card-actions>
                    </md-card>
                    <md-card>
                        <md-card-title>
                            <md-card-title-text>
                                Opinião Pública
                            </md-card-title-text>
                        </md-card-title>
                        <md-card-actions layout="row" layout-align="end center">
                            <md-button>Comprar (R$0,50)</md-button>
                        </md-card-actions>
                    </md-card>
                </div>`
            })
        }

        $scope.user = {
            user_ID: 1,
            name: "Beatriz Oliveira ",
            avatar: "download(1).png",
            score: "233",
            continents: [
                {
                    continent:'Africa',
                    goal:4,
                    score:3
                },
                {
                    continent:'America do Sul',
                    goal:5,
                    score:2
                },
                {
                    continent:'America do Norte',
                    goal:6,
                    score:2
                },
                {
                    continent:'Asia',
                    goal:5,
                    score:5
                },
                {
                    continent:'Europa',
                    goal:5,
                    score:4

                },
                {
                    continent:'Oceania',
                    goal:3,
                    score:2
                }

            ]
        };


        $scope.ranked = {
            scores: [
                {
                    user_ID: 1,
                    name: "John Due",
                    avatar: "download.png",
                    score: 345
                },
                {
                    user_ID: 2,
                    name: "Raquel Almeida",
                    avatar: "download(1).png",
                    score: 233
                },
                {
                    user_ID: 3,
                    name: "Joao de Souza",
                    avatar: "download(2).png",
                    score: 125
                },
                {
                    user_ID: 4,
                    name: "Rafael da Silva",
                    avatar: "download(3).png",
                    score: 123
                },
                {
                    user_ID: 5,
                    name: "Pedro Albornoe",
                    avatar: "download(4).png",
                    score: 56
                }
            ]
        };


        $scope.data = {
            user_ID: $scope.user.user_ID,
            question_ID: $scope.quiz.question_ID,
            help: null,
            score: null
        };

        $scope.helpJump = function () {
            $scope.data.help = "jump";
            $scope.data.score = $scope.helpScore[$scope.data.help];
            alert(JSON.stringify($scope.data));
        };

        $scope.helpOpinion = function () {
            $scope.data.help = "opinion";
            $scope.data.score = $scope.helpScore[$scope.data.help];
            alert(JSON.stringify($scope.data));
        };

    });
