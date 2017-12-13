/**
 * Created by roi on 14/02/2016.
 */
angular.module('views.news', [])
    .controller('newsCtrl',[ '$scope','newsService', function ($scope, newsService) {
        $scope.getNews = function(){
            var newsFeed = [];
            var feedurl="http://www.2eat.co.il/rss.xml";
            var feedlimit=9;
            var feedpointer=new google.feeds.Feed(feedurl); //Google Feed API method
            feedpointer.setNumEntries(feedlimit);//Google Feed API method
            feedpointer.load(displayfeed); //Google Feed API method

            function displayfeed(result){
                if (!result.error){
                    var thefeeds=result.feed.entries
                    for (var i=0; i<thefeeds.length; i++){
                        newsFeed.push({
                            'title': thefeeds[i].title,
                            'link': thefeeds[i].link
                        });
                    }
                    console.log(newsFeed);
                    $scope.newsFeed=newsFeed;
                }else
                    alert("Error fetching feeds!")
            }
        };
    }]);