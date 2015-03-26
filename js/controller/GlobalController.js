var globalModule = angular.module('globalModule', []);

globalModule.controller('globalController', ['$scope', '$location', function($scope, $location) {

	$scope.ipc = require('ipc');

	$scope.showMessageModal = function(message) {
		if (!message) return;
		$scope.message = message;
		$('#message-modal').modal('show');
	};

    $scope.connections = [];
    if (localStorage.getItem('connections')) {
    	$scope.connections = JSON.parse(localStorage.getItem('connections'));
    }

    $scope.setConnection = function(connection) {
        $scope.connections.push(connection);
        localStorage.setItem('connections', JSON.stringify($scope.connections));
    };

    $scope.removeConnection = function(id) {
        var _index;
        $scope.connections.forEach(function(item, index) {
            if (item.id === id) {
                _index = index;
            }
        });
        if (typeof _index !== 'undefined') {
            $scope.connections.splice(_index, 1);
        }

        localStorage.setItem('connections', JSON.stringify($scope.connections));
    };

    $scope.connectionExist = function(connection) {

    	for (var i = 0; i < $scope.connections.length; i++) {
    		var curr = $scope.connections[i];
    		if (curr.id === connection.id) {
    			return true;
    		}
    	}

    	return false;
    };

}]);
