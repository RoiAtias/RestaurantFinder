/**
 * Created by roi on 8/02/2016.
 */
angular.module('services.adminService', [])
    .service('adminService', ['$http',
        function ($http) {
            'use strict';

            var login = function (email, password) {
                return $http.get('/login/'+email+'/'+password).then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            };

            return {
                login: login,
            }
        }]);
