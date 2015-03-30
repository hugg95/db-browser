var connectionModule = angular.module('connectionModule', []);

connectionModule.controller('connectionController', ['$scope', '$window', '$location', function($scope, $window, $location) {

	// default mysql connection config
	$scope.connection = {
		name: '',
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: ''
	};

	// message will displayed to user when creating a dupliate connection
	$scope.duplicateMessage = {
		title: 'duplicate connection',
		body: 'the connection has exist',
		fatal: false,
		success: false
	};

	/**
	 * finds the max connection-id from the created connections
	 */
    $scope.findMaxId = function() {
        var maxId = -1;
        if (!$scope.connections || $scope.connections.length === 0) {
        	return 0;
        }
        $scope.connections.forEach(function(item, index) {
            if (item.id > maxId) {
                maxId = item.id;
            }
        });

        return maxId + 1;
    };

    $scope.connection.id = $scope.findMaxId();

    $scope.connectionBackup = null;

	/**
	 * test the connection
	 */
	$scope.testConnection = function() {
        $scope.connection.test = true;
		$scope.ipc.send('db-connect', $scope.connection);
	};

	/**
	 * start to create a connection
	 */
	$scope.createConnection = function() {
		if ($scope.connectionBackup) {
			if ($scope.connectionBackup.host === $scope.connection.host 
				&& $scope.connectionBackup.port === $scope.connection.port
				&& $scope.connectionBackup.user === $scope.connection.user) {
				$scope.showMessageModal($scope.duplicateMessage);
				return;
			} else {
				$scope.connection.id = $scope.connectionBackup.id + 1;
			}
		}
		if (!$scope.connection.name) {
			$scope.connection.name = $scope.connection.user + '@'+ $scope.connection.host;
		}
        $scope.connection.test = false;
		$scope.ipc.send('db-connect', $scope.connection);
	};

    $scope.handleConnection = function(response) {

        // default message to show
        var message = {
            title: '',
            body: '',
            fatal: false,
            success: true
        };

        // connection successful
        if (!response) {
            message.title = 'Success';
            message.body = 'connection successful';
            return message;
        }

        // connection failed
        var _error = response.err,
            _msg = response.stack,
            _code = _error.code;

        message.fatal = _error.fatal;
        message.success = false;

        // get the first line of the error stack
        message.body = _msg.substr(0, _msg.indexOf('\n'));

        message.title = 'Warning info: ';

        if (_error.fatal) message.title = 'Fatal error: ';
        message.title += _code;

        return message;

    };

    $scope.setConnectCallback(function(arg) {
    	var msg = $scope.handleConnection(arg);
        if ($scope.connection.test) {
            $scope.showMessageModal(msg);
        } else if (!msg.success) {
            $scope.showMessageModal(msg);
        } else {
        	if (!$scope.connectionExist($scope.connection)) {
        		$scope.setConnection($scope.connection);
        		$scope.setCurrentConnection($scope.connection);
        		$scope.connectionBackup = $scope.connection;
        		$window.location.href = '#/db/list/' + $scope.connection.id;
        	} else {
        		$scope.showMessageModal($scope.duplicateMessage);
        	}
        }
    });

}]);

