'use strict';

(function(){

angular.module('app')
  .component('levelList', {
    templateUrl: 'src/components/level/levelList.template.html',
    controller: levelListController
  });

function levelListController($scope, $stateParams, $state, levelService){

  $scope.levels = levelService.getLevelsByCategory($stateParams.categoryId);

  console.log($scope.levels);

  $scope.selectLevel = function(levelId) {
  	$state.go('main.level', {levelId: levelId });
  };
}

})();