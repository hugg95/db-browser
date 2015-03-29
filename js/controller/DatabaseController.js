var databaseModule = angular.module('databaseModule', ['connectionModule']);

databaseModule.controller('databaseController', ['$scope', '$routeParams', function($scope, $routeParams) {
	
	$scope.showDbs = function() {
		$scope.ipc.send('db-connect', $scope.currentConnection);
		$scope.setConnectCallback(function() {
			$scope.ipc.send('show-dbs');
		});
	};

	$scope.ipc.on('show-dbs-reply', function(arg) {
		console.log(arg);
	});

	// set the global current connection
	if (typeof $routeParams.connectionId !== 'undefined') {
		$scope.connections.forEach(function(item, index) {
			if (item.id == $routeParams.connectionId) {
				$scope.setCurrentConnection(item);
			}
		});
console.log($scope.currentConnection);
		$scope.showDbs();

	}

}]);
