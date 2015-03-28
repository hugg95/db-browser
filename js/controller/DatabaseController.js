var databaseModule = angular.module('databaseModule', []);

databaseModule.controller('databaseController', ['$scope', '$routeParams', function($scope, $routeParams) {
	
	if (typeof $routeParams.connectionId !== 'undefined') {
		$scope.connections.forEach(function(item, index) {
			if (item.id == $routeParams.connectionId) {
				$scope.setCurrentConnection(item);
			}
		});
	}

}]);
