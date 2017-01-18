'use strict';

(function(){

angular.module('app')
  .component('categoryList', {
    controller: categoryListController,
    templateUrl: 'src/components/category/categoryList.template.html'
  });

function categoryListController($scope, $state, levelService){

  $scope.categories = levelService.getCategories();

  $scope.selectCategory = function(categoryId) {
  	$state.go('main.category', {categoryId: categoryId});
  };
}

})();