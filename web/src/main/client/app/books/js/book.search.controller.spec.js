describe('book controller', function() {
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

	it('search is defined', inject(function($controller) {
		// when
		$controller('BookSearchController', {
			$scope : $scope
		});
		// then
		expect($scope.search).toBeDefined();
	}));

	it('add book is defined', inject(function($controller) {
		// when
		$controller('BookSearchController', {
			$scope : $scope
		});
		// then
		expect($scope.addBook).toBeDefined();
	}));

	it('edit book is defined', inject(function($controller) {
		// when
		$controller('BookSearchController', {
			$scope : $scope
		});
		// then
		expect($scope.editBook).toBeDefined();
	}));

	it('delete book should call bookService.deleteBook', inject(function(
			$controller, $q, bookService, Flash) {
		// given
		$controller('BookSearchController', {
			$scope : $scope
		});

		var bookId = 1;
		$scope.books = [ {
			id : bookId,
			title : 'test'
		} ];
		var deleteDeferred = $q.defer();
		spyOn(bookService, 'deleteBook').and
				.returnValue(deleteDeferred.promise);
		spyOn(Flash, 'create');

		// when
		$scope.deleteBook(bookId);
		deleteDeferred.resolve();
		$scope.$digest();

		// then
		expect(bookService.deleteBook).toHaveBeenCalledWith(bookId);
		expect(Flash.create).toHaveBeenCalledWith('success',
				'Książka ' + bookId + ' została usunięta.', 'custom-class');
		expect($scope.books.length).toBe(0);
	}));

	it('search books should call bookService.searchBook', inject(function(
			$controller, $q, bookService) {
		// given
		$controller('BookSearchController', {
			$scope : $scope
		});
		$scope.prefix = 'first';
		$scope.books = [ {
			id : 1,
			title : 'first book'
		}, {
			id : 2,
			title : 'second book'
		} ];
		var results = {
			'data' : [ {
				id : 1,
				title : 'first book'
			} ]
		};
		var searchDeferred = $q.defer();
		spyOn(bookService, 'search').and.returnValue(searchDeferred.promise);

		// when
		$scope.search();
		searchDeferred.resolve(results);
		$scope.$digest();

		// then
		expect(bookService.search).toHaveBeenCalledWith($scope.prefix);
		expect($scope.books.length).toBe(1);
	}));

	it('search all books should call bookService.searchBook', inject(function(
			$controller, $q, bookService) {
		// given
		$controller('BookSearchController', {
			$scope : $scope
		});
		$scope.prefix = '';
		$scope.books = [];
		var results = {
			'data' : [ {
				id : 1,
				title : 'first book'
			}, {
				id : 2,
				title : 'second book'
			} ]
		};
		var searchDeferred = $q.defer();
		spyOn(bookService, 'search').and.returnValue(searchDeferred.promise);

		// when
		$scope.search();
		searchDeferred.resolve(results);
		$scope.$digest();

		// then
		expect(bookService.search).toHaveBeenCalledWith($scope.prefix);
		expect($scope.books.length).toBe(2);
	}));

});
