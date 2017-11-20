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

    .service('Pergunta', function (api) {
        var json = '?format=json';

        return {
            fetchList() {

                /*
                return Promise.resolve([
                    {
                        "id_pergunta": 12,
                        "pergunta": "Qual era o apelido dsa cantora Elis Regina?",
                        "alt_a": "GAUCHINHA",
                        "alt_b": "PAULISTINHA",
                        "alt_c": "PIMENTINHA",
                        "alt_d": "ANDORINHA",
                        "alt_correta": "c"
                    },
                    {
                        "id_pergunta": 12,
                        "pergunta": "Qual era o apelido dsa cantora Elis Regina?",
                        "alt_a": "GAUCHINHA",
                        "alt_b": "PAULISTINHA",
                        "alt_c": "PIMENTINHA",
                        "alt_d": "ANDORINHA",
                        "alt_correta": "c"
                    },
                    {
                        "id_pergunta": 12,
                        "pergunta": "Qual era o apelido dsa cantora Elis Regina?",
                        "alt_a": "GAUCHINHA",
                        "alt_b": "PAULISTINHA",
                        "alt_c": "PIMENTINHA",
                        "alt_d": "ANDORINHA",
                        "alt_correta": "c"
                    },
                    {
                        "id_pergunta": 12,
                        "pergunta": "Qual era o apelido dsa cantora Elis Regina?",
                        "alt_a": "GAUCHINHA",
                        "alt_b": "PAULISTINHA",
                        "alt_c": "PIMENTINHA",
                        "alt_d": "ANDORINHA",
                        "alt_correta": "c"
                    },
                    {
                        "id_pergunta": 11,
                        "pergunta": "Qual era o apelisdo da cantora Elis Regina?",
                        "alt_a": "GAUCHINHA",
                        "alt_b": "PAULISTINHA",
                        "alt_c": "PIMENTINHA",
                        "alt_d": "ANDORINHA",
                        "alt_correta": "c"
                    },
                    {
                        "id_pergunta": 10,
                        "pergunta": "Qual era o apelido da cantora Elis Regina?",
                        "alt_a": "GAUCHINHA",
                        "alt_b": "PAULISTINHA",
                        "alt_c": "PIMENTINHA",
                        "alt_d": "ANDORINHA",
                        "alt_correta": "c"
                    },
                    {
                        "id_pergunta": 1,
                        "pergunta": "Qual era o apelido da cantora Elis Regina?",
                        "alt_a": "GAUCHINHA",
                        "alt_b": "PAULISTINHA",
                        "alt_c": "PIMENTINHA",
                        "alt_d": "ANDORINHA",
                        "alt_correta": "c"
                    },
                    {
                        "id_pergunta": 2,
                        "pergunta": "Quem era o apresentador que reprovava os calouros tocando uma buzina?",
                        "alt_a": "RAUL GIL",
                        "alt_b": "BOLINHA",
                        "alt_c": "FLÁVIO CAVALCANTI",
                        "alt_d": "CHACRINHA",
                        "alt_correta": "d"
                    },
                    {
                        "id_pergunta": 3,
                        "pergunta": "Qual lugar é também chamado de Santa Sé?",
                        "alt_a": "VENEZA",
                        "alt_b": "VITÓRIA",
                        "alt_c": "VANCOUVER",
                        "alt_d": "VATICANO",
                        "alt_correta": "d"
                    },
                    {
                        "id_pergunta": 4,
                        "pergunta": "Qual personagem da turma da Mônica tem apenas cinco fios de cabelo?",
                        "alt_a": "MÔNICA",
                        "alt_b": "CEBOLINHA",
                        "alt_c": "CASCÃO",
                        "alt_d": "MAGALI",
                        "alt_correta": "b"
                    },
                    {
                        "id_pergunta": 5,
                        "pergunta": "Qual cantor é o pai da dupla Sandy e Júnior?",
                        "alt_a": "LEONARDO",
                        "alt_b": "XORORÓ",
                        "alt_c": "ZEZÉ DI CAMARGO",
                        "alt_d": "CHITÃOZINHO",
                        "alt_correta": "b"
                    },
                    {
                        "id_pergunta": 6,
                        "pergunta": "Quem ocupou o cargo de Ministro da Saúde do Brasil no ano de 2000?",
                        "alt_a": "ADIB JATENE",
                        "alt_b": "JOSÉ SERRA",
                        "alt_c": "CIRO GOMES",
                        "alt_d": "PEDRO MALAN",
                        "alt_correta": "b"
                    },
                    {
                        "id_pergunta": 7,
                        "pergunta": "",
                        "alt_a": "",
                        "alt_b": "",
                        "alt_c": "",
                        "alt_d": "",
                        "alt_correta": "b"
                    },
                    {
                        "id_pergunta": 8,
                        "pergunta": "",
                        "alt_a": "",
                        "alt_b": "",
                        "alt_c": "",
                        "alt_d": "",
                    }
                ])
                */

                return fetch(`${api}/pergunta/list${json}`, {mode: 'cors'})
                    .then(function (r) {
                        return r.json()
                    })

            },

            post(id) {
                return fetch(`${api}/pergunta/${id}${json}`, {mode: 'cors'})
                    .then(function (r) {
                        return r.json()
                    })
            },

        }
    })

    .controller('adminCtrl', function ($scope, $http, Pergunta) {

        var api = "https://show-prod.herokuapp.com/api/v1";
        var json = '?format=json';

        $scope.menu = true;
        $scope.perguntas = [];
        $scope.data = {};

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

        function reset_new () {
            $scope.new = {
                pergunta:"",
                alternativas: [
                    {
                        alternativa:"",
                        resposta:0
                    },
                    {
                        alternativa:"",
                        resposta:0
                    },
                    {
                        alternativa:"",
                        resposta:0
                    },
                    {
                        alternativa:"",
                        resposta:0
                    },
                ]
            };
        }

        reset_new();

        Object.assign($scope, {
            submit(url) {
                /*
                switch (url){
                    case "create":
                        $http.post(`${api}/pergunta/${json}`)
                            .then(function(response) {
                                console.log(response.data);
                                $scope.perguntas = response.data;
                            });
                        break;
                    case "update":
                        $http.put(`${api}/pergunta/`,)
                            .then(function(response) {
                                $scope.perguntas = response.data;
                            });
                        break;
                    case "delete":
                        $http.put(`${api}/pergunta/`,)
                            .then(function(response) {
                                $scope.perguntas = response.data;
                            });
                        break;
                 }
                */
                switch (url){
                    case "create":
                        $http.post(`${api}/pergunta/create`,$scope.new)
                            .then(function(response) {
                                reset_new();
                                $scope.perguntas.push(response.data);
                                alert("Pergunta criada.");
                            });
                        break;
                    case "read":
                        $http.get(`${api}/pergunta/list`)
                            .then(function(response) {
                                console.log(response.data);
                                $scope.perguntas = response.data;
                            });
                        break;

                    case "update":
                        $http.put(`${api}/pergunta/${$scope.data.id_pergunta}`,$scope.data)
                            .then(function(response) {
                                alert("Pergunta salva.");
                            });
                        break;
                    case "delete":
                        $http.delete(`${api}/pergunta/${$scope.data.id_pergunta}`,$scope.data)
                            .then(function(response) {
                                $scope.submit('read');
                                $scope.data = {};
                                alert("Pergunta excluida.");
                            });
                        break;
                }
                $scope.data.crud = url;
            },

            selectQuestion(pergunta) {
                $scope.data = pergunta;
            },
            selectUser(usuario) {
                $scope.user = usuario;
            },

            submitUser(url) {
                console.log($scope.user);
                switch (url){
                    case "create":
                        $http.post(`${api}/user/`,$scope.user)
                            .then(function(response) {
                               $scope.usuarios.push(response.data);
                                alert("Usuario criada.");
                            });
                        break;
                    case "read":
                        $http.get(`${api}/user`)
                            .then(function(response) {
                                console.log(response.data);
                                $scope.usuarios = response.data;
                            });
                        break;

                    case "update":
                        $http.put(`${api}/pergunta/${$scope.data.id_pergunta}`,$scope.data)
                            .then(function(response) {
                                alert("Pergunta salva.");
                            });
                        break;
                    case "delete":
                        $http.delete(`${api}/pergunta/${$scope.data.id_pergunta}`,$scope.data)
                            .then(function(response) {
                                $scope.submit('read');
                                alert("Pergunta excluida.");
                            });
                        break;
                }
                $scope.data.crud = url;
            },
        });

        $scope.submit('read');
        $scope.submitUser('read');

        /*
        $http.get(`${api}/pergunta/${json}`)
            .then(function(response) {
                console.log(response.data);
                $scope.perguntas = response.data;
            });
       */




        /*
        Pergunta.fetchList().then(function (perguntas) {
            console.log(perguntas);
            $scope.perguntas = perguntas;
            $scope.$apply()

        })
        */
    });