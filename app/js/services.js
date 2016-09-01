'use strict';

var shareServices = angular.module('shareServices', []);

shareServices.factory('ArticleService', ['$resource', '$localStorage', 'urlArticle', function ($resource, $localStorage, urlArticle) {
    return $resource(urlArticle, 
      {
        article: "@article"
      }
    );
}]);

shareServices.service('AuthenticationService', ['$http', '$q', '$localStorage', '$location', '$rootScope', function ($http, $q, $localStorage, $location, $rootScope) {
  this.login = function (email, password, urlAuthentication) {
    var deferred = $q.defer();
    return $http.post(urlAuthentication, { email: email, password: password })
      .success(function (response) {
        if (response.token) {
            // store username and token in local storage to keep user logged in between page refreshes
            $localStorage.currentUser = { email: email, token: response.token };
        }
        deferred.resolve(response);
      })
      .error(function (response) {
        deferred.reject(response);
      }
    );
  }
}]);

shareServices.service('UserService', ['$localStorage', '$location', function ($localStorage, $location) {
  this.logout = function () {
    delete $localStorage.currentUser;
    $location.path('/login');
  }
  this.isLoggedIn = function () {
    if($localStorage.currentUser) {
      return true;
    } else {
      return false;
    }
  }
  this.getEmail = function () {
    return $localStorage.currentUser ? $localStorage.currentUser.email : 'default';
  }
}]);
