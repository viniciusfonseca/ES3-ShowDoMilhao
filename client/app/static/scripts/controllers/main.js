'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope) {
    $scope.todos = [
      'Criar as models no Django, baseado nas tabelas',
      'Definir quais servicos o front vai precisar',
      'Implementar os serviços na API para o client(front) consumir',
      'Ajeitar tudo isso aqui pra ficar mais bonito',
      'O que o time achar que precisa ser feito'
    ];
  });
