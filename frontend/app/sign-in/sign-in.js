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

    .controller('signInCtrl', function($scope, User, $location) {

        $scope.submit = function(){
            // alert(JSON.stringify($scope.user));

            User.login( $scope.user ).then(function(res) {
                console.log('*** login realizado com sucesso', res)

                $location.path('/shop')
            })
            .then(function(err) {
                console.log('*** erro ao realizar login', err)
            })
        }
    });
