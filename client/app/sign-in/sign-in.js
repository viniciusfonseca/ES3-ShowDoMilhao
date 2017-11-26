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

    .controller('signInCtrl', function($scope, User, $location, $rootScope) {

        $rootScope.user = {}
        delete $rootScope.token

        Object.assign($scope, {
            logging: false,

            showLogin() {
                $scope.logging = true
            },

            login() {
                User.login({
                    email: $scope.email,
                    password: $scope.password
                }).then(function(res) {
                    console.log('LOGIN', res)
                    $rootScope.user = res.user
                    $rootScope.token = res.token
                    $location.path('/intro')
                })
            },

            register() {
                $location.path('/register')
            }
        })

        $scope.submit = function(){
            // alert(JSON.stringify($scope.user));

            User.login( $scope.user ).then(function(res) {
                console.log('*** login realizado com sucesso', res)

                $location.path('/map')
            })
            .then(function(err) {
                console.log('*** erro ao realizar login', err)
            })
        }
    });
