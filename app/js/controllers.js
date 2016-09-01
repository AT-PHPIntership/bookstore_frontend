'use strict';

var bookControllers = angular.module('bookControllers', [
  'ngRoute'
]);

bookControllers.controller('ViewController', ['$scope', 'UserService', 'commonLanguage', 
  function ($scope, UserService, commonLanguage) {
    // set language
    $scope.titlePage = commonLanguage.titlePage;
    $scope.labelHome = commonLanguage.labelHome;
    $scope.labelLoginRegister = commonLanguage.labelLoginRegister;
    $scope.labelPostArticleFree = commonLanguage.labelPostArticleFree;
    $scope.labelPostedArticles = commonLanguage.labelPostedArticles;
    $scope.labelProfile = commonLanguage.labelProfile;
    $scope.labelHistoryTransaction = commonLanguage.labelHistoryTransaction;
    $scope.titleWebPage = commonLanguage.titleWebPage;
    $scope.labelLogout = commonLanguage.labelLogout;
    $scope.labelEmail = commonLanguage.labelEmail;
    $scope.labelPhone = commonLanguage.labelPhone;
    $scope.labelContact = commonLanguage.labelContact.toUpperCase();
    $scope.labelAbout = commonLanguage.labelAbout;
    $scope.contentAbout = commonLanguage.contentAbout;
    $scope.labelCustomerServices = commonLanguage.labelCustomerServices;
    $scope.contentCustomerServices = commonLanguage.contentCustomerServices;
    $scope.labelHumanResource = commonLanguage.labelHumanResource;
    $scope.contentHumanResource = commonLanguage.contentHumanResource;
    $scope.labelAuthor = commonLanguage.labelAuthor;
    $scope.labelCarrer = commonLanguage.labelCarrer;
    $scope.labelLicense = commonLanguage.labelLicense;
    
    // process logic
    $scope.isLoggedIn = UserService.isLoggedIn();
    $scope.email = UserService.getEmail();
  }
]);

bookControllers.controller('HomeController', ['$scope', '$route', 'ArticleService', 'commonLanguage', 'homeLanguage', 
  function ($scope, $route, ArticleService, commonLanguage, homeLanguage) {
    // set language
    $scope.labelBuy = commonLanguage.labelBuy;
    $scope.labelSell = commonLanguage.labelSell;
    $scope.dollarCurrency = homeLanguage.dollarCurrency;
    
    // process logic
    ArticleService.query().$promise
      .then(function (data) {
        $scope.articles = data;
      })
      .catch(function (fallback) {
        $scope.articles = fallback.toUpperCase() + '!!';
      }
    );
  }
]);

bookControllers.controller('IndexController', ['$scope', '$route', '$localStorage', 
  function ($scope, $route, $localStorage) {
  }
]);

bookControllers.controller('LogoutController', ['UserService', 
  function (UserService) {
    UserService.logout();
  }
]);

bookControllers.controller('AboutController', ['$scope', '$route', 
  function ($scope, $route) {
    
  }
]);

bookControllers.controller('LoginController', ['$scope', '$location', '$rootScope', 
  'AuthenticationService', '$localStorage', 'urlAuthentication', 'commonLanguage', 'loginLanguage', 
  function ($scope, $location, $rootScope, AuthenticationService, $localStorage, urlAuthentication,
    commonLanguage, loginLanguage) {
      // set language
        $scope.labelSignin = loginLanguage.labelSignin;
        $scope.labelForgotPassword = loginLanguage.labelForgotPassword;
        $scope.labelRememberMe = loginLanguage.labelRememberMe;
        $scope.labelLoginWithFacebook = loginLanguage.labelLoginWithFacebook;
        $scope.labelLogin = commonLanguage.labelLogin;
        $scope.labelCreateAccount = loginLanguage.labelCreateAccount;
        $scope.labelSignup = loginLanguage.labelSignup;
        $scope.labelSignup = loginLanguage.labelSignup;
        $scope.labelEmail = commonLanguage.labelEmail;
        $scope.labelName = loginLanguage.labelName;
        $scope.labelPassword = loginLanguage.labelPassword;
        $scope.labelBirthday = loginLanguage.labelBirthday;
        $scope.labelAddress = loginLanguage.labelAddress;
        $scope.titleSignup = loginLanguage.titleSignup;
        
        // process logic
        $scope.email = 'dungnv@gmail.com';
        $scope.password = '12345678';
        $scope.isShowedLogin = true;
        $scope.setShowedLogin = function (value) {
          $scope.isShowedLogin = value;
        };
        $scope.login = function () {
          AuthenticationService.login($scope.email, $scope.password, urlAuthentication).then(
            function(successParam) { 
              $location.path('/home');
            }, function(rejectParam) {
              $location.path('/login');
            }
          );
        }
}]);
