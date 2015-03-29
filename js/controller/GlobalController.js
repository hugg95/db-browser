var globalModule = angular.module('globalModule', []);

globalModule.controller('globalController', ['$scope', '$window', '$location', function($scope, $window, $location) {

	$scope.ipc = require('ipc');

	$scope.confimPassed = false;

	$scope.showMessageModal = function(message) {
		if (!message) return;
		$scope.message = message;
		$('#message-modal').modal('show');
	};

	$scope.showConfirmModal = function(confirm, callback) {
		$scope.confimPassed = false;
		if (!confirm) return;
		$scope.confirm = confirm;
		$('#confirm-modal').modal('show');
	};

	$scope.passConfirm = function(fn) {
		$scope.confimPassed = true;
		$('#confirm-modal').modal('hide');
		if (typeof fn === 'function') {
			fn();
		}
	};

    $scope.confirmQuit = function() {
    	$scope.showConfirmModal({text: 'Do you really want to quit?'});
    	$scope.confirmCallback = function() {
    		$scope.ipc.send('app-quit');
    	};
    };

}]);
