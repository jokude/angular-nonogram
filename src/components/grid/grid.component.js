'use strict';

(function(){

angular.module('app')
  .component('grid', {
    templateUrl: 'src/components/grid/grid.template.html',
    controller: gridController
  });

function gridController($scope, $stateParams, levelService){

  const CELL_EMPTY = 0;
  const CELL_MARKED = 1;
  const CELL_SOLVED = 2;
  const CELL_FAILED = 3;

  $scope.maxRowClues = 0;
  $scope.maxColumnClues = 0;
  $scope.level = levelService.getLevel($stateParams.levelId);

  $scope.solution = $scope.level.grid;
  $scope.rows = $scope.solution.length;
  $scope.columns = $scope.solution[0].length;
  $scope.cells =  Array($scope.rows).fill().map(function(){ return Array($scope.columns).fill(CELL_EMPTY); }.bind($scope));

  $scope.range = function(n) {
    return new Array(n);
  };

  $scope.generateClues = function() {

    $scope.rowClues = [];
    $scope.columnClues = [];

    for (var i = 0 ; i < $scope.rows ; i++) {
      var countRows = 0;
      var countColumns = 0;
      var clueRows = [];
      var clueColumns = [];

      for (var j = 0 ; j < $scope.columns ; j++) {

        if ($scope.solution[i][j]) {
          countRows++;
        }
        else if (countRows > 0) {
          clueRows.push({start: j-countRows, number: countRows, enabled: true});
          countRows = 0;
        }

        if ($scope.solution[j][i]) {
          countColumns++;
        }
        else if (countColumns > 0) {
          clueColumns.push({start: j-countColumns, number: countColumns, enabled: true});
          countColumns = 0;
        }
      }

      if (countRows != 0 || clueRows.length == 0) {
        clueRows.push({start: j-countRows, number: countRows, enabled: countRows != 0});
      }

      if (countColumns != 0 || clueColumns.length == 0) {
        clueColumns.push({start: j-countColumns, number: countColumns, enabled: countColumns != 0});
      }

      if(clueRows.length > $scope.maxRowClues){
        $scope.maxRowClues = clueRows.length;
      }

      if(clueColumns.length > $scope.maxColumnClues){
        $scope.maxColumnClues = clueColumns.length;
      }

      $scope.rowClues.push(clueRows);
      $scope.columnClues.push(clueColumns);
    }
  };

  $scope.updateClue = function(index, type) {

    var isRow = (type == 'row');
    var clues = isRow? $scope.rowClues[index]: $scope.columnClues[index];

    for(var i in clues){
      var start = clues[i].start;
      var end = start + clues[i].number;
      clues[i].enabled = false;
      for(var j = start ; j < end ; j++){
        var row = isRow? index: j;
        var column = isRow? j: index;
        if($scope.solution[row][column] !== ($scope.cells[row][column] == CELL_SOLVED) ){
          clues[i].enabled = true;
          break;
        }
      }
    }
  };

  $scope.updateClues = function(row, column) {
    $scope.updateClue(row, 'row');
    $scope.updateClue(column, 'column');
  };

  $scope.checkSolved = function() {
    return $scope.cells.every(function(elem, currentIndex) {
      return elem.every(function(elem2, currentIndex2) {
        return (elem2 === CELL_SOLVED) == $scope.solution[currentIndex][currentIndex2];
      }.bind($scope));
    }.bind($scope));
  };

  $scope.paint = function(row, column) {
    switch ($scope.cells[row][column]) {
      case CELL_EMPTY:
        if ($scope.solution[row][column]) {
          $scope.cells[row][column] = CELL_SOLVED;
          $scope.checkSolved();
        }
        else {
          $scope.cells[row][column] = CELL_FAILED;
        }
        $scope.updateClues(row, column);
        break;
      case CELL_MARKED:
        $scope.cells[row][column] = CELL_EMPTY;
        $scope.updateClues(row, column);
        break;
    }
  };

  $scope.mark = function(row, column) {
    switch ($scope.cells[row][column]) {
      case CELL_EMPTY:
        $scope.cells[row][column] = CELL_MARKED;
        break;
      case CELL_MARKED:
        $scope.cells[row][column] = CELL_EMPTY;
        break;
    }
    $scope.updateClues(row, column);
  };

  $scope.cellState = function(row, column){
    switch ($scope.cells[row][column]) {
       case CELL_EMPTY:
        return 'cell-empty';
      case CELL_MARKED:
        return 'cell-marked';
      case CELL_SOLVED:
        return 'cell-solved';
      case CELL_FAILED:
        return 'cell-failed';
    }
  }

  $scope.clueState = function(clue){
    return (clue === undefined)? 'none': (clue.enabled? 'clue-enabled': 'clue-disabled');
  }

  $scope.generateClues();
}

})();