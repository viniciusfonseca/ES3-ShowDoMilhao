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

.service('Pergunta', function(api) {
    var json = '?format=json'

    return {
        fetchList() {
            return fetch(`${api}/pergunta/list${json}`, { mode: 'cors' })
                .then(function(r) { return r.json() })
        },

        post( id ) {
            return fetch(`${api}/pergunta/${id}${json}`, { mode: 'cors' })
                .then(function(r) { return r.json() })
        }
    }
})

.controller('adminCtrl', function ($scope, Pergunta) {

    $scope.perguntas = []

    $scope.data = {};
    $scope.submit = function (url){
        $scope.data.crud = url;
        alert(JSON.stringify($scope.data));
    }

    Pergunta.fetchList().then(function(perguntas) {
        $scope.perguntas = perguntas

        $scope.$apply()
    })
});