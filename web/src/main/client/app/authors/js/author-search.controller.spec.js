describe('author controller', function() {
	'use strict';

	beforeEach(function() {
		module('app.main');
		module('app.authors');
	});

	var $scope;
	beforeEach(inject(function($rootScope) {
		$scope = $rootScope.$new();
	}));

	it('search is defined', inject(function($controller) {
		// when
		$controller('AuthorSearchController', {
			$scope : $scope
		});
		// then
		expect($scope.search).toBeDefined();
	}));

	it('search should call authorService.findAll',
			inject(function($controller, $q, authorService) {
				// given
				$controller('AuthorSearchController', {
					$scope : $scope
				});

				$scope.authors = [ {
					id : 1,
					firstName : 'Anna',
					lastName : 'Kowalska'
				} ];

				var results = {
					'data' : [ {
						id : 1,
						firstName : 'Anna',
						lastName : 'Kowalska'
					} ]
				};
				var searchDeferred = $q.defer();
				spyOn(authorService, 'findAll').and
						.returnValue(searchDeferred.promise);

				// when
				$scope.search();
				searchDeferred.resolve(results);
				$scope.$digest();

				// then
				expect(authorService.findAll).toHaveBeenCalledWith();
				expect($scope.authors.length).toBe(1);
			}));

});
