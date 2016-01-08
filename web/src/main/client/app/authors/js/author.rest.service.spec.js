describe('author rest service', function() {
	'use strict';

	beforeEach(function() {
		module('app.main');
		module('app.authors');
	});

	var $scope;
	beforeEach(inject(function($rootScope) {
		$scope = $rootScope.$new();
	}));

	it('find all rest is defined', inject(function(authorRestService) {
		// then
		expect(authorRestService.findAll).toBeDefined();
	}));


	it('call authorRestService.findAll', inject(function($httpBackend, authorRestService, currentContextPath) {
		//given
		// when
		$httpBackend.expect('GET', currentContextPath.get() + 'rest/authors/').respond(200);
		authorRestService.findAll().then(function(response) {
			expect(response.status).toEqual(200);
		});
		// then
		$httpBackend.flush();
	}));

	
});
