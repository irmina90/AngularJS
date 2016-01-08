angular.module('app.books').controller('EditBookController', function($scope, $modalInstance) {
		'use strict';
		$scope.edit = function(title) {
			$modalInstance.close(title);
		};
});