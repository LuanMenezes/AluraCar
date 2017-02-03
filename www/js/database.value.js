angular.module('starter')
    .value('DatabaseValues', {
        bancoDados : null,
        setup : function (){
            this.bancoDados = window.openDatabase('aluraCar' , '1.0', 'Bando de Dados da Aplicacao', 3000);
        }
    })