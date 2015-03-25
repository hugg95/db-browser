var globalModule = angular.module('globalModule', []);

globalModule.controller('globalController', ['$scope', '$location', function($scope, $location) {
	console.log('global controller-----------------');
	var ipc = require('ipc');
	ipc.on('create-connection', function(message) {
		console.log('===================');
		$location.path("conn/create");
	});
}]);