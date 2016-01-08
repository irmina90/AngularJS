angular.module('app.books').controller(
		'AddBookController',
		function($scope, $modal, bookService, Flash) {
			'use strict';

			$scope.title = 'title';
			$scope.authors = [];

			$scope.addBook = function(book) {	
				book.authors = convertAuthorsToString(book);
				bookService.addBook(book).then(
						function() {
							console.log(book);
							Flash.create('success', 'Książka o tytule ' + book.title + ' została dodana.',
									'custom-class');
							$scope.$close();
						});
			};

			var convertAuthorsToString = function(book) {
				var allAuthors = '';
				
				if(typeof book.authors.firstName !== 'undefined' && typeof book.authors.lastName !== 'undefined') {
					allAuthors = book.authors.firstName + ' ' + book.authors.lastName + ', ';	
				}
				
				if($scope.authors.length > 0) {
					for (var it = 0; it < $scope.authors.length; it++) {
						allAuthors += $scope.authors[it].firstName + ' ' + $scope.authors[it].lastName + ', ';
					}
				}
				return allAuthors.substr(0, allAuthors.length-2);
			};

			$scope.addMoreAuthors = function() {
				var modalInstance = $modal.open({
					templateUrl : 'books/html/add-authors.html',
					controller : 'AuthorModalController',
					size : 'lg',
					resolve : {
						authors : function() {
							return $scope.authors;
						}
					}
				});

				modalInstance.result.then(function(author) {
					$scope.authors.push(author);
				});
			};

			$scope.deleteAuthor = function(index) {
				$scope.authors.splice(index, 1);
			};

		});
