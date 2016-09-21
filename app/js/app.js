'use strict';

var bookApp = angular.module('bookApp', [
  'bookControllers',
  'shareServices',
  'bookDirectives',
  'satellizer',
  'ui.router',
  'ngStorage',
  'ngResource',
  'languageService',
  'yaru22.angular-timeago',
  'angularFileUpload',
]);
bookApp.config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$httpProvider', 
  function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {
    $stateProvider
      .state('login', {
          url: '/login',
          templateUrl: 'view/login.html',
          controller: 'LoginController'
      })
      .state('home', {
          url: '/home',
          templateUrl: 'view/home.html',
          controller: 'HomeController'
      })
      .state('article', {
          url: '/article',
          templateUrl: 'view/articles/index.html',
          controller: 'ArticleController'
      })
      .state('article-create', {
        url: '/article/create',
        templateUrl: 'view/articles/create.html',
        controller: 'ArticleCreateController'
      })
      .state('article-show', {
          url: '/article/:slug',
          templateUrl: 'view/articles/show.html',
          controller: 'ArticleShowController'
      })
      .state('about', {
          url: '/about',
          templateUrl: 'view/about.html',
          controller: 'AboutController'
      })
      .state('logout', {
          url: '/logout',
          templateUrl: 'view/logout.html',
          controller: 'LogoutController'
      })
      ;
    $urlRouterProvider.otherwise('/login');
  }
]);
var urlBase = 'http://bookstore.me';
bookApp.constant("urlUploads", 'http://bookstore.me/uploads');
bookApp.constant("urlCategoryDetail", urlBase+ '/api/categoryDetail/:categoryDetail');
bookApp.constant("urlCity", urlBase+ '/api/city/:city');
bookApp.constant("urlArticleCreate", urlBase+ '/api/article');
bookApp.constant("urlArticle", urlBase+ '/api/article/:article');
bookApp.constant("urlCategory", urlBase+ '/api/category/:category');
bookApp.constant("urlAuthentication", urlBase+ '/api/authenticate');
bookApp.constant("urlENCommon", 'view/lang/en/common.json');
bookApp.constant("storagePath", 100);
bookApp.constant("defaultSkippedNumber", 0);
bookApp.constant("skippedNumber", 5);
bookApp.constant("takenNumber", 5);
bookApp.constant("offsetHeight", 100);
