angular.module('starter')
    .controller('FinalizarPedidoController', function ($stateParams, $scope, $ionicPopup, $state, CarroService, $ionicHistory, ionicDatePicker) {
        $scope.carroFinalizado = angular.fromJson($stateParams.carro);

        $scope.pedido = {};

        $scope.dtAgendamento;

        $scope.abrirPopupCalendario = function (){
            var config = {
                callback: function (data){
                    $scope.dtAgendamento = new Date(data);
                },
                mondayFirst: false,
                weeksList : ['D','S', 'T', 'Q', 'Q', 'S', 'S']
            };
            ionicDatePicker.openDatePicker(config);
        };

        $scope.finalizarPedido = function () {

            var pedidoFinalizado = {
                params: {
                    carro: $scope.carroFinalizado.nome,
                    preco: $scope.carroFinalizado.preco,
                    nome: $scope.pedido.nome,
                    endereco: $scope.pedido.endereco,
                    email: $scope.pedido.email,
                    dtagenda: $scope.dtAgendamento
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