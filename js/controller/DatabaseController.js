var databaseModule = angular.module('databaseModule', []);

databaseModule.controller('databaseController', ['$scope', '$routeParams', '$window', function($scope, $routeParams, $window) {

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

		$scope.showDbs();

		$scope.ipc.on('show-dbs-reply', function(arg) {
			$scope.$apply(function() {
				var _databases = JSON.parse(JSON.stringify(arg));
                var databases = [];
				if (_databases) {
					for (var i = 0; i < _databases.length; i++) {
						var _item = _databases[i];
                        _item.id = i;
						databases.push(_item);
					}

                    $scope.setDatabases(databases);
				}
			});
			
		});

	}

}]);
