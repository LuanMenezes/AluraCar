angular.module('starter')
    .controller('ListagemController', function ($scope, CarroService) {
//        $scope.listaCarros = ['BMW 120i','Onix 1.6', 'Fiesta 2.0', 'Fusca 1500'];
        CarroService.obterCarros().then(function (dados) {
            $scope.listaCarros = dados;;
        });
    });