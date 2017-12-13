/**
 * Created by roi on 1/02/2016.
 */
angular.module('views.about', [])
    .controller('aboutCtrl',[ '$scope' ,function ($scope) {
        $scope.user = {
            name: 'Roi&Shirel'
        };

        console.log('the controller fired app');
    }]);