'use strict';
var articleControllers = angular.module('articleControllers', []);

articleControllers.controller('ArticleShowController', 
  function ($scope, $stateParams, Article, commonLanguage, $location, constant, ResponseStatusHandleService, NgMap) {
    $scope.init = function () {
      // set language
      $scope.labelLeaveAComment = commonLanguage.common.labelLeaveAComment;
      $scope.buttonSubmit = commonLanguage.common.buttonSubmit;
      $scope.labelCreatedBy = commonLanguage.showArticleLanguage.labelCreatedBy;
      $scope.labelPostedOn = commonLanguage.showArticleLanguage.labelPostedOn;
      $scope.previousButton = commonLanguage.showArticleLanguage.previousButton;
      $scope.nextButton = commonLanguage.showArticleLanguage.nextButton;
      
      Article.get($stateParams.slug).then(function (response){
        $scope.article = response.data.article;
        $scope.interval = constant.interval;
        $scope.active = 0;
        var slides = $scope.slides = [];
        for (var i = 0; i < $scope.article.images.length; i++) {
          slides.push({
            image: constant.urlUploads + '/' + $scope.article.images[i].name,
            id: i
          });
        }
      }, function (response) {
        ResponseStatusHandleService.process(response.status);
      });
    };
    $scope.init();

  }
);

articleControllers.controller('ArticleCreateController', 
  function ($rootScope, $scope, $stateParams, CategoryDetail, City, Article, commonLanguage, ResponseStatusHandleService, uiUploader, NgMap, constant) {
    $scope.init = function () {
      // set language
      $scope.labelBuy = commonLanguage.common.labelBuy;
      $scope.labelSell = commonLanguage.common.labelSell;
      $scope.buttonSubmit = commonLanguage.common.buttonSubmit;
      $scope.buttonCancel = commonLanguage.common.buttonCancel;
      $scope.MB = 1024;
      $scope.required = commonLanguage.errorLanguage.required;
      $scope.minLength = commonLanguage.errorLanguage.minLength;
      $scope.maxLength = commonLanguage.errorLanguage.maxLength;
      $scope.labelContactInfo = commonLanguage.createArticleLanguage.labelContactInfo;
      $scope.labelName = commonLanguage.createArticleLanguage.labelName ;
      $scope.labelEmail = commonLanguage.createArticleLanguage.labelEmail;
      $scope.labelAddress = commonLanguage.createArticleLanguage.labelAddress;
      $scope.placeHolderAddress = commonLanguage.createArticleLanguage.placeHolderAddress;
      $scope.labelPhone = commonLanguage.createArticleLanguage.labelPhone;
      $scope.labelContentArticle = commonLanguage.createArticleLanguage.labelContentArticle;
      $scope.labelCategory = commonLanguage.createArticleLanguage.labelCategory;
      $scope.labelCity = commonLanguage.createArticleLanguage.labelCity;
      $scope.labelType = commonLanguage.createArticleLanguage.labelType;
      $scope.labelTitle = commonLanguage.createArticleLanguage.labelTitle;
      $scope.placeHolderTitle = commonLanguage.createArticleLanguage.placeHolderTitle;
      $scope.labelDescription = commonLanguage.createArticleLanguage.labelDescription;
      $scope.placeHolderDescription = commonLanguage.createArticleLanguage.placeHolderDescription;
      $scope.labelPrice = commonLanguage.createArticleLanguage.labelPrice;
      $scope.placeHolderPrice = commonLanguage.createArticleLanguage.placeHolderPrice;
      $scope.labelImages = commonLanguage.createArticleLanguage.labelImages;
      $scope.labelTotalFiles = commonLanguage.createArticleLanguage.labelTotalFiles;
      $scope.labelData = commonLanguage.createArticleLanguage.labelData;
      $scope.labelCreateArticle = commonLanguage.successLanguage.labelCreateArticle;
      
      // set display data
      $scope.data = {
        'type' : 'sell',
        'city_id' : '',
        'category_detail_id' : '',
      };
      City.query().then(function (response){
        $scope.cities = response.data;
        $scope.data.city_id = $scope.cities[0].id;
      }, function (response) {
        ResponseStatusHandleService.process(response.status);
      });
      
      CategoryDetail.query().then(function (response){
        $scope.categoryDetails = response.data;
        $scope.data.category_detail_id = $scope.categoryDetails[0].id;
      }, function (response) {
        ResponseStatusHandleService.process(response.status);
      });
      
      // set map
      $scope.types = [constant.mapType];
      $scope.placeChanged = function() {
        $scope.place = this.getPlace();
        $scope.map.setCenter($scope.place.geometry.location);
        $scope.data.lat = $scope.place.geometry.location.lat();
        $scope.data.lng = $scope.place.geometry.location.lng();
      }
      NgMap.getMap().then(function(map) {
        $scope.map = map;
      });
      
    };
    
    // upload file
    $scope.btn_remove = function(file) {
        uiUploader.removeFile(file);
    };
    $scope.btn_clean = function() {
        uiUploader.removeAll();
    };
    $scope.files = [];
    var element = document.getElementById('createArticleFiles');
    element.addEventListener('change', function(e) {
        var files = e.target.files;
        uiUploader.addFiles(files);
        $scope.files = uiUploader.getFiles();
        $scope.$apply();
    });
  
    // summit form
    $scope.submit = function (isValid) {
      if (isValid) {
        Article.store(uiUploader.getFiles(), $scope.data).then(function (response){
          
        }, function (response) {
          $scope.errors = response.data.meta.message;
        });
      }
    }
    $scope.init();
  }
);
