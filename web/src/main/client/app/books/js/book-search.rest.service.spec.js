describe('book rest service', function() {
	'use strict';

	beforeEach(function() {
		module('app.main');
		module('app.books');
	});

	var $scope;
	beforeEach(inject(function($rootScope) {
		$scope = $rootScope.$new();
	}));

	it('search rest is defined', inject(function(bookRestService) {
		// then
		expect(bookRestService.search).toBeDefined();
	}));

	it('addBook rest is defined', inject(function(bookRestService) {
		// then
		expect(bookRestService.deleteBook).toBeDefined();
	}));

	it('deleteBook rest is defined', inject(function(bookRestService) {
		// then
		expect(bookRestService.deleteBook).toBeDefined();
	}));

	it('updateBookTitle rest is defined', inject(function(bookRestService) {
		// then
		expect(bookRestService.deleteBook).toBeDefined();
	}));

	it('call bookRestService.search', inject(function($httpBackend, bookRestService, currentContextPath) {
		//given
		var titlePrefix = 'first';
		var book = {
				'id' : 1,
				'title' : 'title'
			};
		// when
		$httpBackend.expect('GET', currentContextPath.get() + 'rest/books/books-by-title?titlePrefix=' + titlePrefix).respond(book);
		bookRestService.search(titlePrefix).then(function(response) {
			expect(response.status).toEqual(200);
			expect(response.data).toEqual(book);
		});

		// then
		$httpBackend.flush();
	}));

	it('call bookRestService.addBook', inject(function($httpBackend, bookRestService, currentContextPath) {
		//given
		var book = {
				'id' : 1,
				'title' : 'title'
			};
		// when
		$httpBackend.expect('POST', currentContextPath.get() + 'rest/books/book', book).respond(book);
		bookRestService.addBook(book).then(function(response) {
			expect(response.status).toEqual(200);
			expect(response.data).toEqual(book);
		});
		// then
		$httpBackend.flush();
	}));
	
	it('call bookRestService.deleteBook', inject(function($httpBackend, bookRestService, currentContextPath) {
		//given
		var book = {
				'id' : 1,
				'title' : 'title'
			};
		// when
		$httpBackend.expect('DELETE', currentContextPath.get() + 'rest/books/book/' + book.id).respond(book.id);
		bookRestService.deleteBook(book.id).then(function(response) {
			expect(response.status).toEqual(200);
		});
		// then
		$httpBackend.flush();
	}));
	
	it('call bookRestService.updateBookTitle', inject(function($httpBackend, bookRestService, currentContextPath) {
		//given
		var book = {
				'id' : 1,
				'title' : 'title'
			};
		// when
		$httpBackend.expect('POST', currentContextPath.get() + 'rest/books/book/' + book.id + '/' + book.title).respond(book.id,book.title);
		bookRestService.updateBookTitle(book.id,book.title).then(function(response) {
			expect(response.status).toEqual(200);
		});
		// then
		$httpBackend.flush();
	}));
	
});
