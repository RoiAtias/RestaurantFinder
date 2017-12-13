/**
 * Created by roi on 6/02/2016.
 */
angular.module('views.home', [])
    .controller('homeCtrl', ['$scope', 'restService' ,function ($scope, restService) {
        function init () {
         $scope.loading = false;

        }

        $scope.saveRest = function () {
            //validations if needed..

        };

        init();
    }]);