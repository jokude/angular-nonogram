'use strict';

(function(){

angular.module('app')
  .component('levelList', {
    controller: levelListController,
    templateUrl: 'src/components/level/levelList.template.html'
  });

function levelListController($scope, $element, $stateParams, $mdMedia, levelService){

  $scope.levels = levelService.getLevelsByCategory($stateParams.categoryId);

  console.log($scope.levels);

  $scope.selectLevel = function(level) {

  };
}

})();