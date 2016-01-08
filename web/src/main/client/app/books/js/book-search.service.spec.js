describe('book service', function() {
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

	it('search is defined', inject(function(bookService) {
		// then
		expect(bookService.search).toBeDefined();
	}));
	
	it('addBook is defined', inject(function(bookService) {
		// then
		expect(bookService.deleteBook).toBeDefined();
	}));
	
	it('deleteBook is defined', inject(function(bookService) {
		// then
		expect(bookService.deleteBook).toBeDefined();
	}));
	
	it('updateBookTitle is defined', inject(function(bookService) {
		// then
		expect(bookService.deleteBook).toBeDefined();
	}));

	it('search book should call bookRestService.search', inject(function(
			bookService, bookRestService) {
		// given
		var prefix = '';
		spyOn(bookRestService, 'search').and.returnValue();
		// when
		bookService.search(prefix);
		// then
		expect(bookRestService.search).toHaveBeenCalledWith(prefix);
	}));

	it('delete book should call bookRestService.deleteBook', inject(function(
			bookService, bookRestService) {
		// given
		var bookId = 1;
		spyOn(bookRestService, 'deleteBook').and.returnValue();
		// when
		bookService.deleteBook(bookId);
		// then
		expect(bookRestService.deleteBook).toHaveBeenCalledWith(bookId);
	}));

	it('add book should call bookRestService.addBook', inject(function(bookService,
			bookRestService) {
		// given
		var book = {
				'id' : 1,
				'title' : 'title'
			};
		spyOn(bookRestService, 'addBook').and.returnValue();
		// when
		bookService.addBook(book);
		// then
		expect(bookRestService.addBook).toHaveBeenCalledWith(book);
	}));
	
	it('edit title book should call bookRestService.updateBookTitle', inject(function(bookService,
			bookRestService) {
		// given
		var book = {
				'id' : 1,
				'title' : 'new title'
			};
		spyOn(bookRestService, 'updateBookTitle').and.returnValue();
		// when
		bookService.updateBookTitle(book.id, book.title);
		// then
		expect(bookRestService.updateBookTitle).toHaveBeenCalledWith(book.id, book.title);
	}));


});
