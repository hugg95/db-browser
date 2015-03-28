// communicates with the browser
var browserModule = angular.module('browserModule', []);

browserModule.controller('browserController', ['$scope', '$window', function($scope, $window) {
	
	$scope.ipc.on('call-new-conn', function(event, arg) {
		$window.location.href = '#/conn/create';
	});

}]);