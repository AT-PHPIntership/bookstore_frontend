'use strict';
var articleControllers = angular.module('articleControllers', []);

articleControllers.controller('ArticleShowController', 
  function ($scope, $stateParams, Article, commonLanguage, showArticleLanguage, urlUploads) {
    // set language
    $scope.labelLeaveAComment = commonLanguage.labelLeaveAComment;
    $scope.buttonSubmit = commonLanguage.buttonSubmit;
    $scope.labelCreatedBy = showArticleLanguage.labelCreatedBy;
    $scope.labelPostedOn = showArticleLanguage.labelPostedOn;
    $scope.previousButton = showArticleLanguage.previousButton;
    $scope.nextButton = showArticleLanguage.nextButton;
    
    // process logic
    $scope.urlUploads = urlUploads;
    Article.get({ slug : $stateParams.slug }).$promise
      .then(function (data) {
        $scope.article = data;
        console.log(data);
      })
      .catch(function (fallback) {
        $scope.labelError = commonLanguage.labelError;
      }
    );
  }
);

articleControllers.controller('ArticleCreateController', 
  function ($scope, $stateParams, CategoryDetail, City,
      fileUpload, Article, FileUploader, urlArticleCreate, 
      UserService, createArticleLanguage, commonLanguage, alertLanguage) {
    // set language
    $scope.labelBuy = commonLanguage.labelBuy;
    $scope.labelSell = commonLanguage.labelSell;
    $scope.buttonSubmit = commonLanguage.buttonSubmit;
    $scope.buttonCancel = commonLanguage.buttonCancel;
    $scope.MB = 1024;
    $scope.required = alertLanguage.required;
    $scope.minLength = alertLanguage.minLength;
    $scope.maxLength = alertLanguage.maxLength;
    $scope.labelContactInfo = createArticleLanguage.labelContactInfo;
    $scope.labelName = createArticleLanguage.labelName ;
    $scope.labelEmail = createArticleLanguage.labelEmail;
    $scope.labelAddress = createArticleLanguage.labelAddress;
    $scope.labelPhone = createArticleLanguage.labelPhone;
    $scope.labelContentArticle = createArticleLanguage.labelContentArticle;
    $scope.labelCategory = createArticleLanguage.labelCategory;
    $scope.labelCity = createArticleLanguage.labelCity;
    $scope.labelType = createArticleLanguage.labelType;
    $scope.labelTitle = createArticleLanguage.labelTitle;
    $scope.labelDescription = createArticleLanguage.labelDescription;
    $scope.labelPrice = createArticleLanguage.labelPrice;
    $scope.labelImages = createArticleLanguage.labelImages;
    $scope.labelTotalFiles = createArticleLanguage.labelTotalFiles;
    $scope.labelData = createArticleLanguage.labelData;
    
    // process logic
    $scope.credentials = angular.toJson(UserService.getCredentials());
    $scope.name = UserService.getCredentials().name;
    $scope.email = UserService.getCredentials().email;
    $scope.phone = UserService.getCredentials().phone;
    $scope.address = UserService.getCredentials().address;
    $scope.data = {
      'type' : 'sell',
    };
    CategoryDetail.query().$promise
      .then(function (data) {
        $scope.categoryDetails = data;
        $scope.data.category_detail_id = data[0];
      })
      .catch(function (fallback) {
        
      }
    );
    City.query().$promise
      .then(function (data) {
        $scope.cities = data;
        $scope.data.city_id = data[0];
      })
      .catch(function (fallback) {
        
      }
    );
    var uploader = $scope.uploader = new FileUploader();
    
    $scope.submit = function (isValid) {
      if (isValid) {
        var files = [];
        angular.forEach($scope.uploader.queue, function (item) {
          files.push(item._file);
        });
        $scope.data.category_detail_id = $scope.data.category_detail_id.id;
        $scope.data.city_id = $scope.data.city_id.id;
        fileUpload.uploadFileToUrl(files, $scope.data, urlArticleCreate);
      }
    }
  }
);
