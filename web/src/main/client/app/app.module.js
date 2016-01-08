angular.module('app', ['ngRoute',  'app.main', 'app.authors', 'app.component2', 'app.books', 'flash','ui.bootstrap'])
    .config(function ($locationProvider) {
        'use strict';
        $locationProvider.html5Mode(false);
    })
    .value('config', {
        contextPath: 'workshop'
    });