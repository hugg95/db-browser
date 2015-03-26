var globalModule = angular.module('globalModule', []);

globalModule.controller('globalController', ['$scope', '$location', function($scope, $location) {
	
	$scope.ipc = require('ipc');

	$scope.showMessageModal = function(message) {
		if (!message) return;
		$scope.message = message;
		$('#message-modal').modal('show');
	};

}]);
