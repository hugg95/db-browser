var databaseModule = angular.module('databaseModule', []);

databaseModule.controller('databaseController', ['$scope', '$routeParams', function($scope, $routeParams) {

	$scope.databases = [{Database: 'dsdsds'}];

	$scope.showDbs = function() {
		$scope.ipc.send('db-connect', $scope.currentConnection);
		$scope.setConnectCallback(function() {
			$scope.ipc.send('show-dbs');
		});
	};

	// set the global current connection
	if (typeof $routeParams.connectionId !== 'undefined') {
		$scope.connections.forEach(function(item, index) {
			if (item.id == $routeParams.connectionId) {
				$scope.setCurrentConnection(item);
			}
		});

		$scope.databases = [];

		$scope.showDbs();

		$scope.ipc.on('show-dbs-reply', function(arg) {
			var _database = JSON.parse(JSON.stringify(arg));

			if (_database) {
				for (var i = 0; i < _database.length; i++) {
					var _item = _database[i];
					$scope.databases.push(_item);
				}

				for (var i = 0; i < $scope.databases.length; i++) {
					console.log($scope.databases[i].Database);
				}
			}
		});

	}

}]);
