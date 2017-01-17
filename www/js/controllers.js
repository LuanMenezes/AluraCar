angular.module('starter')

        .controller('ListagemController', function ($scope, CarroService) {
            CarroService.obterCarros().then(function (dados) {
                $scope.listaCarros = dados;
            });
        })
        .controller('CarroController', function ($stateParams, $scope) {
            $scope.carro = angular.fromJson($stateParams.carro);

            $scope.listaAcessorios = [{"nome": "Freio ABS", "preco": 800},
                {"nome": "Ar-condicionado", "preco": 1000},
                {"nome": "MP3 Player", "preco": 500}];

            $scope.mudou = function (acessorio, isMarcado) {
                if (isMarcado) {
                    $scope.carro.preco += acessorio.preco;
                } else {
                    $scope.carro.preco -= acessorio.preco;
                }
            };
        })
        .controller('PedidoController', function ($stateParams, $scope, $ionicPopup, $state, CarroService) {
            $scope.pedidoCarro = angular.fromJson($stateParams.carro);

            $scope.pedido = {};

            $scope.finalizarPedido = function () {

                var pedidoFinalizado = {
                    params: {
                        carro: $scope.pedidoCarro.nome,
                        preco: $scope.pedidoCarro.preco,
                        nome: $scope.pedido.nome,
                        endereco: $scope.pedido.endereco,
                        email: $scope.pedido.email
                    }
                }

                CarroService.salvarPedido(pedidoFinalizado)
                        .then(function (dados) {
                            $ionicPopup.alert({
                                title: "Parabens",
                                template: "Compra Finalizada com sucesso"
                            }).then(function () {
                                $state.go('listagem');
                            });
                        }, function (erro) {
                            $ionicPopup.alert({
                                title: "Dados incorretos",
                                template: "Campos obrigatorios"
                            });
                        });
            };
        })
        .controller('LoginController', function ($scope, CarroService, $ionicPopup, $state) {
            $scope.login = {};

            $scope.realizarLogin = function () {

                var dadosLogin = {
                    params: {
                        email: $scope.login.email,
                        senha: $scope.login.senha
                    }
                }

                CarroService.realizarLogin(dadosLogin).then(function (dados) {
                    $state.go('listagem');
                }, function (erro) {
                    $ionicPopup.alert({
                        title: "Dados Incorretos",
                        template: "Verifique os campos preenchidos"
                    }).then(function () {
                        $state.go('listagem');
                    });// ESTA COM O STATE GO PQ A URL NAO ESTA ATIVA
                })

            }
        });