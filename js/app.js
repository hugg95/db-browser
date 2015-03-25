var dbBrowser = angular.module('dbBrowser', ['ngRoute']);

dbBrowser.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
    .when('/index', {
        templateUrl: '',
        controller: ''
    })
    .when('/table/list', {
    });
}]);
