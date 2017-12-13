/**
 * Created by roi on 2/02/2016.
 */
angular.module('views.rests', [])
    .controller('restsCtrl',[ '$scope','$stateParams' ,function ($scope, $stateParams){
            console.log($stateParams);
            $scope.rests = $stateParams["rests"];


    }]);