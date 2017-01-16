'use strict';

(function(){

angular.module('app')
  .component('visualGrid', {
    templateUrl: 'src/components/grid/visual.template.html',
    bindings: {
  		grid: '<'
  	},
    controller: function($scope){
      $scope.grid = this.grid;
    }  
  });
})();