var tableModule = angular.module('tableModule', []);

tableModule.controller('tableController', ['$scope', '$routeParams', function($scope, $routeParams) {
	
    if (typeof $routeParams.databaseId !== 'undefined') {
        $scope.setCurrentDatabase();
    }

}]);
