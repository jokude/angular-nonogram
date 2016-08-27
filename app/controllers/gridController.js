app.controller('gridController', function ($scope) {

  const CELL_EMPTY = 0;
  const CELL_MARKED = 1;
  const CELL_SOLVED = 2;
  const CELL_FAILED = 3;

  this.rows = 3;
  this.columns = 3;

  this.cells =  Array(this.rows).fill().map(function(){ return Array(this.columns).fill(CELL_EMPTY); }.bind(this));
  this.solution = [[true, false, false], [false, true, true], [true, false, true]];

  this.maxRowClues = 0;
  this.maxColumnClues = 0;

  this.range = function(n) {
    return new Array(n);
  };

  this.generateClues = function() {

    this.rowClues = [];
    this.columnClues = [];

    for (i = 0 ; i < this.rows ; i++) {
      var countRows = 0;
      var countColumns = 0;
      var clueRows = [];
      var clueColumns = [];

      for (j = 0 ; j < this.columns ; j++) {

        if (this.solution[i][j]) {
          countRows++;
        }
        else if (countRows > 0) {
          clueRows.push({start: j-countRows, number: countRows, enabled: true});
          countRows = 0;
        }

        if (this.solution[j][i]) {
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

      if(clueRows.length > this.maxRowClues){
        this.maxRowClues = clueRows.length;
      }

      if(clueColumns.length > this.maxColumnClues){
        this.maxColumnClues = clueColumns.length;
      }

      this.rowClues.push(clueRows);
      this.columnClues.push(clueColumns);
    }
  };

  this.generateClues();

  this.updateClue = function(index, type) {

    var isRow = (type == 'row');
    var clues = isRow? this.rowClues[index]: this.columnClues[index];

    for(i in clues){
      var start = clues[i].start;
      var end = start + clues[i].number;
      clues[i].enabled = false;
      for(j = start ; j < end ; j++){
        var row = isRow? index: j;
        var column = isRow? j: index;
        if(this.solution[row][column] !== (this.cells[row][column] == CELL_SOLVED) ){
          clues[i].enabled = true;
          break;
        }
      }
    }
  };

  this.updateClues = function(row, column) {
    this.updateClue(row, 'row');
    this.updateClue(column, 'column');
  };

  this.checkSolved = function() {
    return this.cells.every(function(elem, currentIndex) {
      return elem.every(function(elem2, currentIndex2) {
        return (elem2 === CELL_SOLVED) == this.solution[currentIndex][currentIndex2];
      }.bind(this));
    }.bind(this));
  };

  this.paint = function(row, column) {
    switch (this.cells[row][column]) {
      case CELL_EMPTY:
        if (this.solution[row][column]) {
          this.cells[row][column] = CELL_SOLVED;
          this.checkSolved();
        }
        else {
          this.cells[row][column] = CELL_FAILED;
        }
        this.updateClues(row, column);
        break;
      case CELL_MARKED:
        this.cells[row][column] = CELL_EMPTY;
        this.updateClues(row, column);
        break;
    }
  };

  this.mark = function(row, column) {
    switch (this.cells[row][column]) {
      case CELL_EMPTY:
        this.cells[row][column] = CELL_MARKED;
        break;
      case CELL_MARKED:
        this.cells[row][column] = CELL_EMPTY;
        break;
    }
    this.updateClues(row, column);
  };

  this.cellState = function(row, column){
    switch (this.cells[row][column]) {
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

  this.clueState = function(clue){
    return (clue === undefined)? 'none': (clue.enabled? 'clue-enabled': 'clue-disabled');
  }

});
