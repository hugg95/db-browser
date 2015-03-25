var globalModule = angular.module('globalModule', []);

globalModule.controller('globalController', ['$scope', '$location', function($scope, $location) {
	$scope.ipc = require('ipc');
}]);