/**
 * Created by roi on 8/02/2016.
 */
angular.module('services.restAdminService', [])
    .service('restAdminService',['$http',
        function ($http) {
            'use strict';

            var getAllRests = function () {
                return $http.get('/adminMenu').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            };

            var getAllOffers = function () {
                return $http.get('/adminMenuOffers').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            };
            var getAllTypes = function () {
                return $http.get('/adminMenuTypes').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            };

            var CreateNewRest = function (data) {
                $http.post('/addRest',data).success(function(){
                        console.log('ok!');
                    })
                    .error(function(err) {
                        console.log('Error: ' + err);
                    });
            }
            var DeleteRest = function (data) {
                $http.post('/deleteRest',data).success(function(){
                        console.log('rest has been deleted!');
                    })
                    .error(function(err) {
                        console.log('Error: ' + err);
                    });
            }
            var getOffers = function (data) {
                return $http.get('/getOffers').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            }

            var getTypes = function (data) {
                return $http.get('/getTypes').then( function(data){
                    if(data["data"] == null)
                        return false;
                    else return JSON.stringify(data["data"]);
                });
            }

            var getAllOffersAndTypes = function (restName) {
                return $http.get('/getAllOffersAndTypes/'+restName+'').then(function(Name){
                        return  JSON.stringify(Name["data"]);
                });
            };

            var reSaveRest = function (data) {
                $http.post('/reSaveRest',data).success(function(){
                        console.log('ok!');
                    })
                    .error(function(err) {
                        console.log('Error: ' + err);
                    });
            }

            var getRestsGroupByCity = function () {
                return $http.get('/adminMenuRestsByCity').then( function(data){
                    if(data["data"] == null) {
                        console.log('false');
                        return false;
                    }else {
                        return JSON.stringify(data["data"]);
                    }
                });
            };

            return {
                getAllRests: getAllRests,
                getAllOffers:getAllOffers,
                getAllTypes:getAllTypes,
                CreateNewRest:CreateNewRest,
                DeleteRest:DeleteRest,
                getOffers:getOffers,
                getTypes:getTypes,
                getAllOffersAndTypes:getAllOffersAndTypes,
                reSaveRest:reSaveRest,
                getRestsGroupByCity:getRestsGroupByCity
            }
        }]);
