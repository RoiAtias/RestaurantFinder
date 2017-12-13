/**
 * Created by shirel on 1/02/2016.
 */
angular.module('views.advancedSearch', [])
    .controller('advancedSearchCtrl', ['$scope', 'restService','$state', function ($scope, restService, $state) {

        $scope.searchRest = function(){
            var type =  $scope.type;

            //only city search
            if(($scope.name == null) && ($scope.city != null) && ( $scope.type == null)){
                $scope.rests = restService.getRestsByCity($scope.city).then(function(data){
                    $state.go('rests',{ rests:data });
                });
            }
            //name & city search
            else if(($scope.name) && ($scope.city) && (type == null)){
                $scope.rests = restService.getRest($scope.name, $scope.city).then(function(data){
                    $state.go('rests',{ rests:data });
                });
            }
            //only name search
            else if(($scope.name !=null) && ($scope.city==null) && (type == null)){

                $scope.rests = restService.getRestsByName($scope.name).then(function(data){
                    $state.go('rests',{ rests:data });
                });
            }
            //only type search
            else if((($scope.name==null) && ($scope.city==null) && (type != null))){

                $scope.rests = restService.getRestsByType(type).then(function(data){
                    $state.go('rests',{ rests:data });
                });
            }
            //name & city & type search
            else if((($scope.name!=null) && ($scope.city!=null) && (type != null))){

                $scope.rests = restService.getRestByNameCityType($scope.name, $scope.city, type).then(function(data){
                    $state.go('rests',{ rests:data });
                });
            }
            //name & type search
            else if((($scope.name!=null) && ($scope.city==null) && (type != null))){

                $scope.rests = restService.getRestByNameType($scope.name, type).then(function(data){
                    $state.go('rests',{ rests:data });
                });
            }
            // city & type
            else if((($scope.name==null) && ($scope.city!=null) && (type != null))){

                $scope.rests = restService.getRestByCityType($scope.city, type).then(function(data){
                    $state.go('rests',{ rests:data });
                });
            }

        }

        $scope.rssfeed = function(){
            var feedurl="http://www.ynet.co.il/Integration/StoryRss1854.xml"
            var feedlimit=5
            var rssoutput="Latest Slashdot News:</b><br /><ul>"


            var feedpointer=new google.feeds.Feed(feedurl) //Google Feed API method
            feedpointer.setNumEntries(feedlimit) //Google Feed API method
            feedpointer.load(displayfeed) //Google Feed API method

            var newsFeed = [];
            function displayfeed(result){
                if (!result.error){
                    var thefeeds=result.feed.entries
                    for (var i=0; i<thefeeds.length; i++){

                        newsFeed.push({
                            'title': thefeeds[i].title,
                            'link': thefeeds[i].link
                        });

                    }
                    $scope.newsFeed = newsFeed;

                }
                else
                    alert("Error fetching feeds!")
            }
        }
    }]);
