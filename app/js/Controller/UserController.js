'use strict';
var userControllers = angular.module('userControllers', []);


userControllers.controller('AdsController', 
  function ($scope, Article, commonLanguage, constant) {
    $scope.init = function () {
      // set language
    };
    $scope.init();

    $scope.alertMe = function() {
      setTimeout(function() {
        console.log('You\'ve selected the alert tab!');
      });
    };

    $scope.model = {
      name: 'Tabs'
    };
  }
);
