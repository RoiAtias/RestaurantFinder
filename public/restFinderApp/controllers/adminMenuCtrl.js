/**
 * Created by roi on 5/02/2016.
 */
angular.module('views.adminMenu', [])
    .controller('adminMenuCtrl',[ '$scope','restAdminService','$state' ,function ($scope, restAdminService, $state ) {
        $scope.tabs = [
            {
            url: './views/AdminHtml/deleteRest.html'
            }, {
            url: './views/AdminHtml/restOffer.html'
            }, {
            url: './views/AdminHtml/restType.html'
            }, {
            url: './views/AdminHtml/createRest.html'
            }, {
            url: './views/AdminHtml/editRest.html'
            }, {
            url: './views/AdminHtml/restGroupBy.html'
            }
        ];

        $scope.activeTab = $scope.tabs[0];
        $scope.restTab= $scope.tabs[0];
        $scope.offersTab= $scope.tabs[1];
        $scope.typeTab= $scope.tabs[2];
        $scope.CreateTab= $scope.tabs[3];
        $scope.editRestTab= $scope.tabs[4];
        $scope.groupByCityTab= $scope.tabs[5];

        var init = function () {
            $scope.models = [];
            $scope.restTypes = [];
            $scope.data = restAdminService.getAllRests().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var restsObj = JSON.parse(data);
                $scope.restsObj = restsObj;
            });

            $scope.initializeOffers = restAdminService.getOffers().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var restOffer = JSON.parse(data);
                $scope.restsOffers = restOffer;
                console.log($scope.restsOffers);
            });

            $scope.initializeTypes = restAdminService.getTypes().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var restType = JSON.parse(data);
                $scope.restTypes = restType;
                console.log($scope.restTypes);
            });
        }

        init();

        $scope.rest= function(){
            $scope.activeTab = $scope.tabs[0];
        }

        $scope.restOffer = function(){
            $scope.activeTab = $scope.tabs[1];
            $scope.data = restAdminService.getAllOffers().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var restOffers = JSON.parse(data);
                $scope.restsOffers = restOffers;
            });

        }

        $scope.restType = function(){
            $scope.activeTab = $scope.tabs[2];
            $scope.data = restAdminService.getAllTypes().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var restTypes = JSON.parse(data);
                $scope.restTypes = restTypes;
            });

        }

        $scope.CreateRest = function(){
            $scope.restName = "";
            $scope.restCity = "";
            $scope.restStreet ="";
            $scope.restHouseNum = "";
            $scope.restPrice = "";
            $scope.restWebsite = "";
            $scope.activeTab = $scope.tabs[3];

        }

        $scope.editRest = function(rest){
            $scope.activeTab = $scope.tabs[4];
            $scope.restName = rest.name;
            $scope.restCity = rest.city;
            $scope.restStreet =rest.street;
            $scope.restHouseNum = rest.houseNumber;
            $scope.restPrice = rest.price;
            $scope.restWebsite = rest.website;




            var a = restAdminService.getAllOffersAndTypes(rest.name).then(function(data) {
                if (!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                $scope.offersArray =[];
                $scope.typesArray =[];
                $scope.offersArrayID =[];
                $scope.typesArrayID =[];

                var arrays = JSON.parse(data);
                var offers = arrays["0"]["restOffers"];
                var types = arrays["0"]["types"];
                for(offer in arrays["0"]["restOffers"]){
                    $scope.offersArray.push(restOffers[offer]["name"]);
                    $scope.offersArrayID.push(restOffers[offer]["_id"]);
                    $scope[$scope.offersArray[offer]] = true;
                }
                for(type in arrays["0"]["types"]){
                    $scope.typesArray.push(restType[type]["name"]);
                    $scope.typesArrayID.push(restType[type]["_id"]);
                    $scope[$scope.typesArray[type]] = true;
                }
                console.log(rest["_id"]);
                $scope.newRestName         = rest.name;
                $scope.newRestCity         = rest.city;
                $scope.newRestStreet       = rest.street;
                $scope.newRestHouseNum     = rest.houseNumber;
                $scope.newRestPrice        = rest.price;
                $scope.newRestWebsite      = rest.website;
                $scope.restTypes           =$scope.typesArrayID
                $scope.restOffers          =$scope.offersArrayID;
                $scope.restID = rest["_id"];
            });
        }


        $scope.SaveEditRest =  function(){
            $scope.typesToSend = [];
            $scope.offersToSend = [];
             var offerArray =["Kosher","Badatz","Free Parking","payment Parking","Smoking Area","Open Saturday","Events"];
             var typeArray =["Asian","Coffee","Pizzeria","Italian","Brunch","Burger","Japanese","Fish"];
            for(var i=0;i<7;i++) {
                if ($scope[offerArray[i]] == true) {
                    console.log($scope.restsOffers[i]["_id"]);
                    $scope.offersToSend.push($scope.restsOffers[i]["_id"]);
                }
            }
            for(var i=0;i<8;i++) {
                if ($scope[typeArray[i]] == true) {
                    console.log($scope.restTypes[i]["_id"]);
                    $scope.typesToSend.push($scope.restTypes[i]["_id"]);
                }
            }
            console.log($scope.offersToSend);
            console.log($scope.typesToSend);
            var data = {
                restId:$scope.restID,
                name: $scope.newRestName,
                city: $scope.newRestCity ,
                street:$scope.newRestStreet,
                houseNumber:$scope.newRestHouseNum,
                price:$scope.newRestPrice,
                website:$scope.newRestWebsite,
                restTypes:$scope.typesToSend,
                restOffers:$scope.offersToSend
            };

            $scope.dataToSend = data;
            console.log($scope.dataToSend);
            var data = $scope.dataToSend;
            $scope.reSave = restAdminService.reSaveRest(data);
            location.reload();
        }

        $scope.addRest =  function(){
            $scope.offersIDarray = [];
            $scope.typesIDarray = [];
            for (var i in $scope.models){
                if($scope.models[i] == true){
                    console.log($scope.restsOffers[i]["_id"]);
                    $scope.offersIDarray.push($scope.restsOffers[i]["_id"]);
                }
            }
            for (var i in $scope.restTypes){
                if($scope.restTypes[i] == true){
                    console.log($scope.restTypes[i]["_id"]);
                    $scope.typesIDarray.push($scope.restTypes[i]["_id"]);
                }
            }
            console.log($scope.restTypes);
            console.log($scope.restsOffers);
            console.log($scope.models);
            var data = {
                name: $scope.restName,
                city: $scope.restCity,
                street:$scope.restStreet,
                houseNumber:$scope.restHouseNum,
                coordinates: $scope.coordinates,
                price:$scope.restPrice,
                website:$scope.restWebsite,
                restTypes:$scope.typesIDarray,
                restOffers:$scope.offersIDarray
            };
            $scope.data = restAdminService.CreateNewRest(data);
            location.reload();
        }

        $scope.deleteRest =  function(del){
            var data = {name: del};
            $scope.data = restAdminService.DeleteRest(data);
            location.reload();
        }

        $scope.groupByCity = function(){
            $scope.activeTab = $scope.tabs[5];
            $scope.data = restAdminService.getRestsGroupByCity().then(function(data){
                if(!data){
                    console.log("data is null");
                    alert("wrong details. please try again");
                }
                var restsGroupByCity = JSON.parse(data);
                $scope.restsGroupByCity = restsGroupByCity;
            });
        }


}]);
