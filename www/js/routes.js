angular.module('starter')

        .config(function ($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('login');
            
            $stateProvider
            
            .state('listagem',{
                url : '/listagem',
                templateUrl: 'templates/listagem.html',
                controller: 'ListagemController'
            })
            
            .state('carro',{
                url : '/carro/:carro',
                templateUrl: 'templates/carro.html',
                controller: 'CarroController'
            })
            
            .state('pedido',{
                url : '/pedido/:carro',
                templateUrl: 'templates/pedido.html',
                controller: 'PedidoController'
            })
            
            .state('login',{
                url : '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
        });


