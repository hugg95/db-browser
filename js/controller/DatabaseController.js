var databaseModule = angular.module('databaseModule', []);

databaseModule.controller('databaseController', ['$scope', '$routeParams', function($scope, $routeParams) {
	
	// set the global current connection
	if (typeof $routeParams.connectionId !== 'undefined') {
		$scope.connections.forEach(function(item, index) {
			if (item.id == $routeParams.connectionId) {
				$scope.setCurrentConnection(item);
			}
		});
	}

}]);
