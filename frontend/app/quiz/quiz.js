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

    .controller('quizCtrl', function ($scope, $mdDialog) {

        $scope.helpScore = {
            card: -10,
            jump: -5,
            opinion: -8
        };

        $scope.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'cartas/cartas.html',
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

        $scope.quiz = {
            question_ID: 23,
            question: "Lorem ipsum dolor sit amet, ne quod novum mei. Sea omnium invenire mediocrem at, in lobortis conclusionemque nam. Ne deleniti appetere reprimique pro, inani labitur disputationi te sed. At vix sale omnesque, id pro labitur reformidans accommodare, cum labores honestatis eu. Nec quem lucilius in, eam praesent reformidans no. Sed laudem aliquam ne.",
            alternatives: [
                {
                    alternative_ID: "a",
                    alternative: "A Lorem ipsum dolor sit amet "
                },
                {
                    alternative_ID: "b",
                    alternative: "B Lorem ipsum dolor sit amet"
                },
                {
                    alternative_ID: "c",
                    alternative: "C Lorem ipsum dolor sit amet"
                },
                {
                    alternative_ID: "d",
                    alternative: "D Lorem ipsum dolor sit amet"
                }
            ]
        };


        $scope.submit = function () {
            alert(JSON.stringify($scope.answer))
        };

        $scope.user = {
            user_ID: 1,
            name: "Beatriz Oliveira ",
            avatar: "download(1).png",
            score: "233"
        };

        $scope.answer = {
            user_ID: $scope.user.user_ID,
            question_ID: $scope.quiz.question_ID,
            alternative: null
        };


        $scope.ranked = {
            continent_ID: 1,
            continent: "America do Sul",
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
