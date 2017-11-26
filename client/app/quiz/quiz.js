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

    .controller('quizCtrl', function ($scope, $mdDialog, api, $http, $rootScope) {

        var intervalId = null

        $scope.fetchQuestion = function() {
            fetch(`${api}/pergunta/random`, { headers: {'Authentication': $rootScope.token } }).then(function(res){ return res.json() })
            .then(function(res) {
                console.log('RANDOM RESPONSE',res.data)

                $scope.quiz = res.data[0]
                $scope.timerem = 45

                intervalId = setInterval(function() {
                    $scope.timerem--
                    $scope.$apply()

                    if ($scope.timerem == 0) {

                    }
                }, 1000)
            })
        }

        $scope.fromCharCode = function(n) { return String.fromCharCode(n) }

        $scope.fetchQuestion()

        $scope.quiz = {}

        $scope.submitAnswer = function() {
            if (!$scope.answer) { return }
            console.log('ANSWER', $scope.answer)

            fetch(`${api}/pergunta/${$scope.quiz.id_pergunta}/alternativa/${$scope.answer}`, { headers: {'Authentication': $rootScope.token } })
            .then(function(r) { return r.json() })
                .then(function(res) {
                    console.log('RESPONSE ANSWER', res.data)
                    
                })
        }

        $scope.isGameOver = function() {
            if ($rootScope.user.pontos <= 0) {
                $rootScope.user.pontos = 0
            }

        }

        $scope.skip = function() {
            $rootScope.user.pontos -= 5
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
                    $scope.status = 'You said the information was "' + answer + '".';
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
                    alert(JSON.stringify($scope.data));
                }
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

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
