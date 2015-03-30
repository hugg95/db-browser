var databaseModule = angular.module('databaseModule', []);

databaseModule.controller('databaseController', ['$scope', '$routeParams', function($scope, $routeParams) {

    $scope.currentDatabase = null;

    $scope.setCurrentDatabase = function(database) {
        $scope.currentDatabase = database;
    };

	$scope.showDbs = function() {
		$scope.ipc.send('db-connect', $scope.currentConnection);
		$scope.setConnectCallback(function() {
			$scope.ipc.send('show-dbs');
		});
	};

	// set the global current connection
	if (typeof $routeParams.connectionId !== 'undefined') {

		$scope.databases = [];

		$scope.connections.forEach(function(item, index) {
			if (item.id == $routeParams.connectionId) {
				$scope.setCurrentConnection(item);
			}
		});

		$scope.showDbs();

		$scope.ipc.on('show-dbs-reply', function(arg) {
			$scope.$apply(function() {
				var _database = JSON.parse(JSON.stringify(arg));

				if (_database) {
					for (var i = 0; i < _database.length; i++) {
						var _item = _database[i];
                        _item.id = i;
						$scope.databases.push(_item);
					}
				}
			});
			
		});

	}

}]);
