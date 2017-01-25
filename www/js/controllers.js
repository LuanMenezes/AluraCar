angular.module('starter')
    .controller('ListagemController', function ($scope, CarroService) {
//        $scope.listaCarros = ['BMW 120i','Onix 1.6', 'Fiesta 2.0', 'Fusca 1500'];
        CarroService.obterCarros().then(function (dados) {
            $scope.listaCarros = dados;;
        });
    });
    
angular.module('starter')
    .controller('CarroEscolhidoController', function ($stateParams, $scope) {
        $scope.carroEscolhido = angular.fromJson($stateParams.carro);

        $scope.listaAcessorios = [
            {"nome": "Freio ABS", "preco": 800},
            {"nome": "Ar-condicionado", "preco": 1000},
            {"nome": "MP3 Player", "preco": 500}];

        $scope.mudou = function (acessorio, isMarcado) {
            if (isMarcado) {
                $scope.carroEscolhido.preco += acessorio.preco;
            } else {
                $scope.carroEscolhido.preco -= acessorio.preco;
            }
        };
    });
    
angular.module('starter')
        .controller('FinalizarPedidoController', function ($stateParams, $scope, $ionicPopup, $state, CarroService) {
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
                    });
                }, function (erro) {
                    $ionicPopup.alert({
                        title: "Dados incorretos",
                        template: "Campos obrigatorios"
                    });
                });
            };
        });
        
angular.module('starter')
        .controller('LoginController', function ($scope, CarroService, $ionicPopup, $state, $rootScope) {
            $scope.login = {};

            $scope.realizarLogin = function () {

                var dadosLogin = {
                    params: {
                        email: $scope.login.email,
                        senha: $scope.login.senha
                    }
                };

                CarroService.realizarLogin(dadosLogin).then(function (dados) {
                    $rootScope.usuario = dados.usuario;
                    $state.go('app.listagem');
                }, function (erro) {
                    $ionicPopup.alert({
                        title: "Dados Incorretos",
                        template: "Verifique os campos preenchidos"
                    });
                });
            };
        });
        
angular.module('starter')
        .controller('MenuController', function ($rootScope, $scope){
            $scope.usuarioLogado = $rootScope.usuario;
        });
        
angular.module('starter')
        .controller('PerfilController', function ($rootScope, $scope){
            $scope.estaEditando = false;
            $scope.textoBotao = 'Editar';
            
            $scope.usuarioLogado = $rootScope.usuario;
            
            $scope.acaoBotao = function (){
                if($scope.estaEditando){
                    $scope.estaEditando = false;
                    $scope.textoBotao = 'Editar';
                } else {
                    $scope.estaEditando = true;
                    $scope.textoBotao = 'Salvar';
                }
            };
        });