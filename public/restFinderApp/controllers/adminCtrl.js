/**
 * Created by roi on 5/02/2016.
 */
angular.module('views.admin', [])
        .controller('adminCtrl',[ '$scope','adminService','$state' ,function ($scope,adminService,$state) {
                $scope.adminfunc = function(){
                    var info;
                    $scope.data = adminService.login($scope.adminMail, $scope.adminPassword).then(function(data){
                        info = data;
                        console.log("data: "+data);

                        if(!data){
                            console.log("data is null");
                            alert("wrong details. please try again");
                        }
                        else $state.go('adminMenu');
                    });
                }
}]);

