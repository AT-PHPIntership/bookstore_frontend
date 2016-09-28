'use strict';
var articleControllers = angular.module('articleControllers', []);

articleControllers.controller('ArticleShowController', 
  function ($scope, $stateParams, Article, commonLanguage, $location, constant, ResponseStatusHandleService) {
    $scope.init = function () {
      // set language
      $scope.labelLeaveAComment = commonLanguage.common.labelLeaveAComment;
      $scope.buttonSubmit = commonLanguage.common.buttonSubmit;
      $scope.labelCreatedBy = commonLanguage.showArticleLanguage.labelCreatedBy;
      $scope.labelPostedOn = commonLanguage.showArticleLanguage.labelPostedOn;
      $scope.previousButton = commonLanguage.showArticleLanguage.previousButton;
      $scope.nextButton = commonLanguage.showArticleLanguage.nextButton;
      
      Article.get($stateParams.slug).then(function (response){
        $scope.article = response.data;
        console.log(response.data.images);
        
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
  function ($scope, $stateParams, CategoryDetail, City, Article, FileUploader, commonLanguage, ResponseStatusHandleService) {
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
        $scope.labelPhone = commonLanguage.createArticleLanguage.labelPhone;
        $scope.labelContentArticle = commonLanguage.createArticleLanguage.labelContentArticle;
        $scope.labelCategory = commonLanguage.createArticleLanguage.labelCategory;
        $scope.labelCity = commonLanguage.createArticleLanguage.labelCity;
        $scope.labelType = commonLanguage.createArticleLanguage.labelType;
        $scope.labelTitle = commonLanguage.createArticleLanguage.labelTitle;
        $scope.labelDescription = commonLanguage.createArticleLanguage.labelDescription;
        $scope.labelPrice = commonLanguage.createArticleLanguage.labelPrice;
        $scope.labelImages = commonLanguage.createArticleLanguage.labelImages;
        $scope.labelTotalFiles = commonLanguage.createArticleLanguage.labelTotalFiles;
        $scope.labelData = commonLanguage.createArticleLanguage.labelData;
        $scope.labelCreateArticle = commonLanguage.successLanguage.labelCreateArticle;
        $scope.data = {
          'type' : 'sell',
        };
        $scope.success = false;
        City.query().then(function (response){
          $scope.cities = response.data;
          $scope.data.city_id = $scope.cities[0];
        }, function (response) {
          ResponseStatusHandleService.process(response.status);
        });
        
        CategoryDetail.query().then(function (response){
          $scope.categoryDetails = response.data;
          $scope.data.category_detail_id = $scope.categoryDetails[0];
        }, function (response) {
          ResponseStatusHandleService.process(response.status);
        });
      };
    
    
    var uploader = $scope.uploader = new FileUploader();
    
    $scope.submit = function (isValid) {
      if (isValid) {
        var files = [];
        angular.forEach($scope.uploader.queue, function (item) {
          files.push(item._file);
        });
        $scope.data.category_detail_id = $scope.data.category_detail_id.id;
        $scope.data.city_id = $scope.data.city_id.id;
        Article.store(files, $scope.data).then(function (response){
          $scope.success = true;
        }, function (response) {
          $scope.success = false;
        });
      }
    }
    $scope.init();
  }
);
