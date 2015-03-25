var dbBrowser = angular.module('dbBrowser', ['ngRoute', 'globalModule', 'connectionModule']);

dbBrowser.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
    .when('/index', {
        templateUrl: '',
        controller: ''
    })
    .when('/conn/create', {
    	templateUrl: 'view/connection/connection.html',
    	controller: 'connectionController'
    });
}]);
