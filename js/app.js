var dbBrowser = angular.module('dbBrowser', ['ngRoute', 'globalModule', 'connectionModule']);

dbBrowser.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
    .when('/default', {
        templateUrl: 'view/default.html',
        controller: 'globalController'
    })
    .when('/conn/create', {
    	templateUrl: 'view/connection/connection.html',
    	controller: 'connectionController'
    })
    .when('/conn/open', {
    	templateUrl: 'view/connection/connection.html',
    	controller: 'connectionController'
    })
    .otherwise({
    	templateUrl: 'view/default.html'
    });
}]);
