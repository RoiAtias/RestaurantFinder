/**
 * Created by roi on 1/02/2016.
 */
angular.module('services.restService', [])
    .service('restService', ['$http',
        function ($http) {
            'use strict';
            var getRest = function (restName, City) {
                return $http.get('/SearchRestByNameCity/'+restName+'/'+City).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var getRestsByCity = function (restCity){
                return $http.get('/SearchRestByCity/'+restCity).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var getRestsByName = function (name){
                return $http.get('/SearchRestByName/'+name).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var getRestsByType = function (type){
                return $http.get('/SearchRestByType/'+type).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }
                    else {
                        return data["data"];
                    }
                });
            };

            var getRestByNameCityType = function (name, city, type){
                return $http.get('/SearchRestByNameCityType/'+name+"/"+city+"/"+type).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }else {
                        return data["data"];
                    }
                });
            };

            var getRestByNameType = function (name, type){
                return $http.get('/SearchRestByNameType/'+name+"/"+type).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }else {
                        return data["data"];
                    }
                });
            };

            var getRestByCityType = function (city, type){
                return $http.get('/SearchRestByCityType/'+city+"/"+type).then(function(data){
                    if(data["data"] == null){
                        console.log("data is null");
                        return false;
                    }else {
                        return data["data"];
                    }
                });
            };

            var addRest = function () {
                return $http.post('/your POST req goes here...');
            };

            return {
                getRest: getRest,
                getRestsByCity: getRestsByCity,
                getRestsByName: getRestsByName,
                getRestByNameCityType: getRestByNameCityType,
                getRestByCityType: getRestByCityType,
                getRestByNameType: getRestByNameType,
                getRestsByType: getRestsByType,
                addRest: addRest
            }
        }]);
