'use strict';

var bookApp = angular.module('bookApp', [
  'bookControllers',
  'shareServices',
  'bookDirectives',
  'languageService',
  'satellizer',
  'ui.router',
  'ngStorage',
  'yaru22.angular-timeago',
  'angularFileUpload',
  'ui.bootstrap',
  'ngAnimate',
  'ngSanitize',
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
      .state('404', {
          url: '/error/404',
          templateUrl: 'view/errors/404.html',
          controller: 'PageNotFoundController'
      })
      .state('500', {
          url: '/error/500',
          templateUrl: 'view/errors/500.html',
          controller: 'ServerErrorController'
      });
    $urlRouterProvider.otherwise('/login');
  }
]);
var urlBase = 'http://bookstore.me';
bookApp.run(function ($rootScope ,$location, UserService, $state) {
  $rootScope.endPoint = urlBase;
  $rootScope.$on("$stateChangeStart", function(event, next, current) {
      if (!UserService.isLoggedIn() ) {
        if (next.name == "login" || next.name == "home" || next.name == "article-show") {
          return ;
        } else {
          event.preventDefault();
          $state.go("login");
        }
      }else {
        if (next.name == "login") {
          event.preventDefault();
          $state.go("home");
        }
      }
  });
  $rootScope.url = $state;
});
bookApp.constant("constant", {
  'success200' : 200,
  'error422' : 422,
  'error400' : 400,
  'error500' : 500,
  'urlUploads': 'http://bookstore.me/uploads',
  'urlCategoryDetail': urlBase+ '/api/categoryDetail',
  'urlCity': urlBase+ '/api/city',
  'urlArticle': urlBase+ '/api/article',
  'urlCategory': urlBase+ '/api/category',
  'urlAuthentication': urlBase+ '/api/authenticate',
  'urlENCommon': 'view/lang/en/common.json',
  'storagePath': 100,
  'defaultCurrentPage': 1,
  'maxSizePagination': 5,
  'maxSelectedPagination': 5,
});
