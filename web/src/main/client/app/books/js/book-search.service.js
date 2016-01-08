angular.module('app.books').factory('bookService', function (bookRestService) {
    'use strict';

    return {
        search: function (titlePrefix) {
            return bookRestService.search(titlePrefix);
        },
        addBook: function(book) {
        	return bookRestService.addBook(book);
        },
        deleteBook: function (bookId) {
            return bookRestService.deleteBook(bookId);
        },
        updateBookTitle: function (bookId, title) {
            return bookRestService.updateBookTitle(bookId,title);
        }
    };
});
