'use strict';

var bookControllers = angular.module('bookControllers', [
  'articleControllers',
  'categoryControllers',
  'errorControllers',
  'userControllers',
]);

bookControllers.controller('ViewController', 
  function ($rootScope, $scope, commonLanguage, Category) {
    $scope.init = function () {
      // set language
      $scope.titlePage = commonLanguage.common.titlePage;
      $scope.labelHome = commonLanguage.common.labelHome;
      $scope.labelLoginRegister = commonLanguage.common.labelLoginRegister;
      $scope.labelPostArticleFree = commonLanguage.common.labelPostArticleFree;
      $scope.labelPostedArticles = commonLanguage.common.labelPostedArticles;
      $scope.labelProfile = commonLanguage.common.labelProfile;
      $scope.labelHistoryTransaction = commonLanguage.common.labelHistoryTransaction;
      $scope.titleWebPage = commonLanguage.common.titleWebPage;
      $scope.labelLogout = commonLanguage.common.labelLogout;
      $scope.labelEmail = commonLanguage.common.labelEmail;
      $scope.labelAboutUs = commonLanguage.common.labelAboutUs;
      $scope.labelContact = commonLanguage.common.labelContact;
      $scope.labelCarrer = commonLanguage.common.labelCarrer;
      $scope.labelLicense = commonLanguage.common.labelLicense;
      $scope.labelRecruitment = commonLanguage.common.labelRecruitment;
      
      Category.query().then(function (response){
        $scope.categories = response.data;
      }, function (response) {
        $scope.labelError = commonLanguage.common.labelError;
      });
    };
    
    $scope.init();
  }
);

bookControllers.controller('HomeController', function (
  $rootScope, $scope, Article, commonLanguage, constant, ResponseStatusHandleService) {
    
    $scope.init = function () {
      // set language
      $scope.labelBuy = commonLanguage.common.labelBuy;
      $scope.labelSell = commonLanguage.common.labelSell;
      $scope.dollarCurrency = commonLanguage.homeLanguage.dollarCurrency;
      // process logic
      
      Article.query().then(function (response){
        $scope.articles = response.data.articles;
        $scope.viewby = constant.maxSelectedPagination;
        $scope.totalItems = $scope.articles.length;
        $scope.currentPage = constant.defaultCurrentPage;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = constant.maxSizePagination;
      }, function (response) {
        ResponseStatusHandleService.process(response.status);
      });
    };
    $scope.init();
  }
);

bookControllers.controller('LogoutController', 
  function ($state, AuthenticationService) {
    AuthenticationService.clearCredentials();
    $state.go('login');
  }
);

bookControllers.controller('AboutController',  
  function ($scope) {
  }
);

bookControllers.controller('LoginController', function ($scope, $state, AuthenticationService, constant,
    commonLanguage) {
    $scope.init = function () {
      // set language
      $scope.labelSignin = commonLanguage.loginLanguage.labelSignin;
      $scope.labelForgotPassword = commonLanguage.loginLanguage.labelForgotPassword;
      $scope.labelRememberMe = commonLanguage.loginLanguage.labelRememberMe;
      $scope.labelLoginWithFacebook = commonLanguage.loginLanguage.labelLoginWithFacebook;
      $scope.labelLogin = commonLanguage.common.labelLogin;
      $scope.labelCreateAccount = commonLanguage.loginLanguage.labelCreateAccount;
      $scope.labelSignup = commonLanguage.loginLanguage.labelSignup;
      $scope.labelSignup = commonLanguage.loginLanguage.labelSignup;
      $scope.labelEmail = commonLanguage.common.labelEmail;
      $scope.labelName = commonLanguage.loginLanguage.labelName;
      $scope.labelPassword = commonLanguage.loginLanguage.labelPassword;
      $scope.labelBirthday = commonLanguage.loginLanguage.labelBirthday;
      $scope.labelAddress = commonLanguage.loginLanguage.labelAddress;
      $scope.titleSignup = commonLanguage.loginLanguage.titleSignup;
      
      // process logic
      $scope.email = 'dungnv@gmail.com';
      $scope.password = '12345678';
      $scope.isShowedLogin = true;
    };
    $scope.setShowedLogin = function (value) {
      $scope.isShowedLogin = value;
    };
      
    $scope.setShowedLogin = function (value) {
      $scope.isShowedLogin = value;
    };
    $scope.login = function () {
      
      AuthenticationService.login(constant.urlAuthentication, $scope.email, $scope.password, function (response) {
          if (response.token) {
              AuthenticationService.setCredentials($scope.email, response.user.profile, response.token);
              $state.go('home');
          } else {
              $scope.error = response.message;
              $state.go('login');
          }
      });
    }
    $scope.init();
});
