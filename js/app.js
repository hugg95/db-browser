// app and modules configuration
var dbBrowser = angular.module('dbBrowser', [
    'ngRoute', 
    'browserModule', 
    'globalModule', 
    'connectionModule', 
    'databaseModule', 
    'tableModule', 
    'functionModule', 
    'userModule', 
    'systemModule'
]);

// route configuration
dbBrowser.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
    .when('/default', {
        templateUrl: 'view/default.html',
        controller: 'globalController'
    })
    .when('/conn/create', {
    	templateUrl: 'view/connection/connection.html',
    })
    .when('/conn/open', {
    	templateUrl: 'view/connection/connection.html',
    })
    .when('/db/list/:connectionId', {
    	templateUrl: 'view/db/dbs.html',
    	controller: 'databaseController'
    })
    .when('/table/list/:databaseId', {
    	templateUrl: 'view/table/tables.html',
    	controller: 'tableController'
    })
    .when('/function/list/:databaseId', {
    	templateUrl: 'view/function/functions.html',
    	controller: 'functionController'
    })
    .when('/user/list', {
    	templateUrl: 'view/user/users.html',
    	controller: 'userController'
    })
    .when('/sys/config', {
    	templateUrl: 'view/system/config.html',
    	controller: 'systemController'
    })
    .when('/sys/console/:databaseId', {
    	templateUrl: 'view/system/console.html',
    	controller: 'systemController'
    })
    .otherwise({
    	templateUrl: 'view/default.html'
    });
}]);
