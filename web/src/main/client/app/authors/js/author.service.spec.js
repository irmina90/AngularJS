describe('author service', function() {
	'use strict';

	beforeEach(function() {
		module('app.main');
		module('app.authors');
	});

	var $scope;
	beforeEach(inject(function($rootScope) {
		$scope = $rootScope.$new();
	}));

	it('findAll is defined', inject(function(authorService) {
		// then
		expect(authorService.findAll).toBeDefined();
	}));
	

	it('find all authors should call authorRestService.findAll', inject(function(
			authorService, authorRestService) {
		// given
		spyOn(authorRestService, 'findAll').and.returnValue();
		// when
		authorService.findAll();
		// then
		expect(authorRestService.findAll).toHaveBeenCalledWith();
	}));

});