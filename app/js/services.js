'use strict';

var shareServices = angular.module('shareServices', []);

shareServices.factory('City', function($http, constant) {
    var city = {};
    city.query = function() {
        return $http({
            method: "GET",
            url: constant.urlCity,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    return city;
});


shareServices.factory('Article', function($http, $rootScope, constant) {
    var article = {};
    article.query = function() {
        return $http({
            method: "GET",
            url: constant.urlArticle,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    };
    article.get = function(slug) {
        return $http({
            method: "GET",
            url: constant.urlArticle + '/' + slug,
            params: {
                slug: slug
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.globals.currentUser.token
            }
        });
    };
    article.store = function(files, data) {
        var fd = new FormData();
        angular.forEach(data, function(value, key) {
            fd.append(key, value);
        });
        angular.forEach(files, function(value, key) {
            fd.append('files[]', value);
        });
        return $http.post(constant.urlArticle, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'Authorization': $rootScope.globals.currentUser.token
            }
        }).success(function(response) {

        }).error(function(response) {
            console.log(response);
        });
    };
    return article;
});


shareServices.factory('Category', function($http, constant) {
    var category = {};
    category.query = function() {
        return $http({
            method: "GET",
            url: constant.urlCategory,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    return category;
});


shareServices.factory('CategoryDetail', function($http, constant) {
    var categoryDetail = {};
    categoryDetail.query = function() {
        return $http({
            method: "GET",
            url: constant.urlCategoryDetail,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    return categoryDetail;
});



shareServices.factory('AuthenticationService', function ($http, $cookieStore, $rootScope, $timeout) {
    var service = {};

    service.login = function (urlAuthentication, email, password, callback) {
        $http.post(urlAuthentication, { email: email, password: password })
        .success(function(response) {
            callback(response);
        })
    };

    service.setCredentials = function (email, profile, token) {
        $rootScope.globals = {
            currentUser: {
                email: email,
                profile: profile,
                token: token
            }
        };

        $http.defaults.headers.common['Authorization'] = token;
        $cookieStore.put('globals', $rootScope.globals);
    };

    service.clearCredentials = function () {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = '';
    };

    return service;
});



shareServices.factory('ResponseStatusHandleService', function($state, constant) {
    var responseStatusHandleService = {};
    responseStatusHandleService.process = function(status) {
        switch (status) {
            case constant.error500:
                $state.go('404');
                break;
            case constant.error400:
            case constant.error422:
            default:
                $state.go('404');
                break;
        }
    };
    return responseStatusHandleService;
});
