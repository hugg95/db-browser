var globalModule = angular.module('globalModule', []);

globalModule.controller('globalController', ['$scope', '$window', '$location', function($scope, $window, $location) {

	$scope.ipc = require('ipc');

	$scope.confimPassed = false;

    // global object
    $scope.global = {};

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

    // the current connection
    $scope.currentConnection = null;
    $scope.setCurrentConnection = function(connection) {
        $scope.currentConnection = connection;
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

    /**
     * determines whether the connection has been created
     * @param connection
     */
    $scope.connectionExist = function(connection) {

        if (!connection) {
            return false;
        }

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
     * clear all of the created connections, also from the localStorage
     * clear the current selected connection
     * reset the connection to default
     * clear the connection backup
     */
    $scope.clearConnections = function() {
        localStorage.removeItem('connections');
        $scope.connections.length = 0;
        $scope.setCurrentConnection(null);
        $scope.resetConnection();
        $scope.connectionBackup = null;
    };

    /**
     * resets the connection to default state
     */
    $scope.resetConnection = function() {
        $scope.connection.name = '';
        $scope.connection.host = 'localhost';
        $scope.connection.port = 3306;
        $scope.connection.user = 'root';
        $scope.connection.password = '';
    };

    /**
     * callback function after connection created
     */
    $scope.connectCallback;

    $scope.setConnectCallback = function(callback) {
        $scope.connectCallback = callback;
    };

    /**
     * listen to the db-connect reply
     */
    $scope.ipc.on('db-connect-reply', function(arg) {

        $scope.$apply(function() {
            if (typeof $scope.connectCallback === 'function') {
                $scope.connectCallback(arg);
            }
        });

    });

}]);
