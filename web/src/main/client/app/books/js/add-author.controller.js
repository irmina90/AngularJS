angular.module('app.books').controller('AuthorModalController', function ($scope, $modalInstance) {
    'use strict';
    
	$scope.addAuthor = function(author) {
		$modalInstance.close(author);
	};

});