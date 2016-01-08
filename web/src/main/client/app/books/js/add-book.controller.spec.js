describe('add book controller', function() {
	'use strict';

	beforeEach(function() {
		module('app.main');
		module('flash');
		module('app.books');
	});

	var $scope;
	beforeEach(inject(function($rootScope) {
		$scope = $rootScope.$new();
	}));

	it('add book is defined', inject(function($controller) {
		// when
		$controller('AddBookController', {
			$scope : $scope
		});
		// then
		expect($scope.addBook).toBeDefined();
	}));

	it('add book should call bookService.addBook', inject(function($controller,
			$q, bookService) {
		// given
		$controller('AddBookController', {
			$scope : $scope
		});
		$scope.$close = jasmine.createSpy('$close');
		$scope.firstName = 'Anna';
		$scope.lastName = 'Kowalska';
		$scope.authors = [ {
			id : 1,
			firstName : 'Anna',
			lastName : 'Kowalska'
		} ];
		$scope.book = {
			id : 1,
			title : 'first book',
			authors : ''
		};

		var addDeferred = $q.defer();
		spyOn(bookService, 'addBook').and.returnValue(addDeferred.promise);

		// when
		$scope.addBook($scope.book);
		addDeferred.resolve();
		$scope.$digest();

		// then
		expect(bookService.addBook).toHaveBeenCalledWith($scope.book);
		expect($scope.book.id).toBe(1);
		expect($scope.book.title).toBe('first book');
		expect($scope.book.authors).toBe('Anna Kowalska');
	}));

});
