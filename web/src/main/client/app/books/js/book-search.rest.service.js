angular.module('app.books').factory('bookRestService', function ($http, currentContextPath) {
    'use strict';

    return {
        search: function (titlePrefix) {
            return $http.get(currentContextPath.get() + 'rest/books/books-by-title', {params: {titlePrefix: titlePrefix}});
        },
        addBook: function(book) {
        	return $http.post(currentContextPath.get() + 'rest/books/book', book);
        },
        deleteBook: function (bookId) {
            return $http.delete(currentContextPath.get() + 'rest/books/book/' + bookId);
        },
        updateBookTitle: function (bookId, bookTitle) {
            return $http.post(currentContextPath.get() + 'rest/books/book/' + bookId + '/' + bookTitle);
        }
    };
});