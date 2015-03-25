var connectionModule = angular.module('connectionModule', []);

connectionModule.controller('connectionController', ['$scope', function($scope) {
	
	$scope.ipc = require('ipc');

	// default mysql connection config
	$scope.connection = {
		name: 'anonymous',
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: ''
	};

	$scope.msgAlert = false;

	/**
	 * test the connection
	 */
	$scope.testConnection = function() {
		$scope.ipc.send('db-connect', $scope.connection);
	};

	/**
	 * start to create a connection
	 */
	$scope.createConnection = function() {
		//
	};

	/**
	 * response listener
	 */
	$scope.ipc.on('db-connect-reply', function(arg) {

		$scope.$apply(function() {

			$scope.msgAlert = true;

			if (!arg) {
				$scope.connection.err = null;
				return;
			}

			var _error = arg.err,
				_msg = arg.stack;

			$scope.connection.err = {};
			$scope.connection.err.code = _error.code;
			$scope.connection.err.fatal = _error.fatal;

			// get the first line of the error stack
			$scope.connection.err.message = _msg.substr(0, _msg.indexOf('\n'));
		});

	});

}]);
