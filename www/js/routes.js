angular.module('starter')

        .config(function ($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('listagem');
//            $urlRouterProvider.otherwise('login');
            
            $stateProvider
            
//            .state('app',{
//                url : '/app',
//                templates : 'templates/menu.html',
//                abstract : true,
//                controller : 'MenuController'
//            })
            
            .state('listagem',{
                url : '/listagem',
                templateUrl: 'templates/listagem.html',
                controller: 'ListagemController'
            })
            
//            .state('app.listagem',{
//                url : '/listagem',
//                views : {
//                    'menuContent' : {
//                        templateUrl: 'templates/listagem.html',
//                        controller: 'ListagemController'                        
//                    }
//                },
//            })
            
            .state('carroescolhido',{
                url : '/carroescolhido/:carro',
                templateUrl: 'templates/carroescolhido.html',
                controller: 'CarroEscolhidoController'
            })
            
            .state('finalizarpedido',{
                url : '/finalizarpedido/:carro',
                templateUrl: 'templates/finalizarpedido.html',
                controller: 'FinalizarPedidoController'
            })
            
            .state('login',{
                url : '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
        });


