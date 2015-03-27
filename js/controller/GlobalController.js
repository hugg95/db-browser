var globalModule = angular.module('globalModule', []);

globalModule.controller('globalController', ['$scope', '$location', function($scope, $location) {

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

    $scope.connections = [];
    if (localStorage.getItem('connections')) {
    	$scope.connections = JSON.parse(localStorage.getItem('connections'));
    }

    $scope.setConnection = function(connection) {
        $scope.connections.push(connection);
        localStorage.setItem('connections', JSON.stringify($scope.connections));
    };

    $scope.removeConnection = function(id) {
        var _index;
        $scope.connections.forEach(function(item, index) {
            if (item.id === id) {
                _index = index;
            }
        });
        if (typeof _index !== 'undefined') {
            $scope.connections.splice(_index, 1);
        }

        localStorage.setItem('connections', JSON.stringify($scope.connections));
    };

    $scope.connectionExist = function(connection) {

    	for (var i = 0; i < $scope.connections.length; i++) {
    		var curr = $scope.connections[i];
    		if (curr.id === connection.id) {
    			return true;
    		}
    		if (curr.host === connection.host
    			&& curr.port === connection.port
    			&& curr.user === connection.user) {
    			return true;
    		}
    	}

    	return false;
    };

    /**
     * reset and clear all of the connections
     */
    $scope.resetConnections = function() {
    	localStorage.removeItem('connections');
    	$scope.connections = [];
    };

    $scope.confirmQuit = function() {
    	$scope.showConfirmModal({text: 'Do you really want to quit?'});
    	$scope.confirmCallback = function() {
    		$scope.ipc.send('app-quit');
    	};
    };

}]);
