angular.module('starter')
    .controller('FinalizarPedidoController', function ($stateParams, $scope, $ionicPopup, $state, CarroService, $ionicHistory, ionicDatePicker, DatabaseValues) {
        $scope.carroFinalizado = angular.fromJson($stateParams.carro);

        $scope.pedido = {};
        
        $scope.dtAgendamento;
        
        $scope.abrirPopupCalendario = function (){
            var config = {
                callback : function (data){
                    $scope.dtAgendamento = data;
                },
                weeksList: ["D", "S", "T", "Q", "Q", "S", "S"],
                mondayFirst : false
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
                    email: $scope.pedido.email
                }
            };

            CarroService.salvarPedido(pedidoFinalizado).then(function (dados) {
                $scope.salvarBancoDados('true');
                
                $ionicHistory.nextViewOptions({
                    disableBack : true
                });
                
                $ionicPopup.alert({
                    title: "Parabens",
                    template: "Compra Finalizada com sucesso"
                }).then(function () {
                    $state.go('app.listagem');                    
                });
            }, function (erro) {
                $scope.salvarBancoDados('false');
                $ionicPopup.alert({
                    title: "Oops",
                    template: "Servidor com problemas, tente mais tarde."
                }).then(function () {
                    $state.go('app.listagem');                    
                });
            });
            
            $scope.salvarBancoDados = function(confirmado){
                DatabaseValues.setup();
                DatabaseValues.bancoDados.transaction(function (transacao){
                    transacao.executeSql('INSERT INTO agendamentos (nome, endereco, email, dataAgendamento, modelo, preco, confirmado)'+
                        ' VALUES(?, ?, ?, ?, ?, ?, ?) ',
                    [
                        $scope.pedido.nome, 
                        $scope.pedido.endereco,
                        $scope.pedido.email,
                        $scope.dtAgendamento,
                        $scope.carroFinalizado.nome,
                        $scope.carroFinalizado.preco,
                        confirmado
                    ]);
                });
            }
        };
    });