angular.module('starter')

        .controller('ListagemController', function ($scope, CarroService) {
            CarroService.obterCarros().then(function(dados){
                $scope.listaCarros = dados;
            });            
        })
        .controller('CarroController', function ($stateParams, $scope) {
            $scope.carro = angular.fromJson($stateParams.carro);
    
            $scope.listaAcessorios = [{"nome": "Freio ABS", "preco": 800},
                                    {"nome": "Ar-condicionado", "preco": 1000},
                                    {"nome": "MP3 Player", "preco": 500}];
            
            $scope.mudou = function(acessorio, isMarcado){
                if (isMarcado){
                    $scope.carro.preco += acessorio.preco;
                } else {
                    $scope.carro.preco -= acessorio.preco;
                }
            };
        })
        .controller('PedidoController', function ($stateParams, $scope, $ionicPopup, $state) {
            $scope.pedido = angular.fromJson($stateParams.carro);
            
            $scope.finalizarPedido = function (){
                $ionicPopup.alert({
                    title: "Parabens",
                    template: "Compra Finalizada com sucesso"
                }).then(function (){
                    $state.go('listagem');
                });
            };
        });