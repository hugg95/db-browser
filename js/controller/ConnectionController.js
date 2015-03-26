var connectionModule = angular.module('connectionModule', []);

connectionModule.controller('connectionController', ['$scope', function($scope) {

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
	 * listen to the db-connect reply
	 */
	$scope.ipc.on('db-connect-reply', function(arg) {

		$scope.$apply(function() {

			// default message to show
			var _message = {
				title: '',
				body: '',
				fatal: false,
				success: true
			};

			// connection successful
			if (!arg) {
				_message.title = 'Success';
				_message.body = 'connection successful';
				$scope.showMessageModal(_message);
				return;
			}

			// connection failed
			var _error = arg.err,
				_msg = arg.stack,
				_code = _error.code;

			_message.fatal = _error.fatal;
			_message.success = false;

			// get the first line of the error stack
			_message.body = _msg.substr(0, _msg.indexOf('\n'));

			_message.title = 'Warning info: ';

			if (_error.fatal) _message.title = 'Fatal error: ';
			_message.title += _code;

			$scope.showMessageModal(_message);

		});

	});

}]);
