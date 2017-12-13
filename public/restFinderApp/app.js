// app dependencies should be injected , each controller , directive and service.

var app = angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'views.main',
    'views.advancedSearch',
    'views.admin',
    'views.rests',
    'views.about',
    'views.home',
    'views.news',
    'views.adminMenu',
    'views.chat',
    'ngMap',
    'services.newsService',
    'services.restService',
    'services.adminService',
    'services.restAdminService'
]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/home-page',
            templateUrl: '../views/main.html',
            controller: 'mainCtrl'
        })
        .state('advancedSearch', {
            url: '/advancedSearch',
            templateUrl: '../views/advancedSearch.html',
            controller: 'advancedSearchCtrl'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: '../views/admin.html',
            controller: 'adminCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: '../views/about.html',
            controller: 'aboutCtrl'
        })
        .state('rests', {
            url: '/rests',
            params: {
                rests: null
            },
            templateUrl: '../views/rests.html',
            controller: 'restsCtrl'
        })
        .state('home', {
            url: 'home',
            templateUrl: '../views/AdminHtml/temp.html',
            controller: 'homeCtrl'
        })
        .state('adminMenu', {
            url: '/adminMenu',
            templateUrl: '../views/AdminHtml/adminMenu.html',
            controller: 'adminMenuCtrl'
        })
        .state('chat', {
            url: '/chat',
            templateUrl: '../views/chat.html',
            controller: 'chatCtrl'
        })
        .state('news', {
            url: '/news',
            templateUrl: '../views/news.html',
            controller: 'newsCtrl'
        });

    $urlRouterProvider.otherwise(function ($injector) {
        $injector.get('$state').go('advancedSearch');
    });
}]);

