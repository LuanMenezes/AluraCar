angular.module('starter')
    .controller('FinalizarPedidoController', function ($stateParams, $scope, $ionicPopup, $state, CarroService, $ionicHistory) {
        $scope.carroFinalizado = angular.fromJson($stateParams.carro);

        $scope.pedido = {};

        $scope.finalizarPedido = function () {

            var pedidoFinalizado = {
                params: {
                    carro: $scope.carroFinalizado.nome,
                    preco: $scope.carroFinalizado.preco,
                    nome: $scope.pedido.nome,
                    endereco: $scope.pedido.endereco,
                    email: $scope.pedido.email
                }
            };

            CarroService.salvarPedido(pedidoFinalizado).then(function (dados) {
                $ionicPopup.alert({
                    title: "Parabens",
                    template: "Compra Finalizada com sucesso"
                }).then(function () {
                    $state.go('app.listagem');
                    $ionicHistory.nextViewOptions({
                        disableBack : true
                    });
                });
            }, function (erro) {
                $ionicPopup.alert({
                    title: "Dados incorretos",
                    template: "Campos obrigatorios"
                });
            });
        };
    });