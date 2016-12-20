angular.module('starter')
        .service('CarroService', function ($http) {
            var url = "http://aluracar.herokuapp.com/";
    
            return {
                obterCarros : function (){
                    return $http.get(url).then(function (response){
                        return response.data;
                    });
                }
            }
        });