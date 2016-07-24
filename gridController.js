var app = angular.module('nonogramApp', []);

app.directive('ngRightClick', function($parse) 
{
    return function(scope, element, attrs) 
    {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) 
        {
            scope.$apply(function() 
            {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});

app.controller('gridController', function ($scope) 
{
	this.rows = 3;
	this.columns = 3;

	this.grid =  Array(this.rows).fill().map(function(){ return Array(this.columns).fill('empty'); }.bind(this));
	this.solution = [[false, false, false], [false, true, true], [true, false, true]];
	this.clues = { rows: [], columns: []};

	this.range = function(n)
	{
        return new Array(n);
    };

	var generateClues2 = function()
	{
		for (i = 0 ; i < this.rows ; i++)
		{
			var countRows = 0;
			var countColumns = 0;
			var clueRows = [];
			var clueColumns = [];

			for (j = 0 ; j < this.columns ; j++)
			{
				if (this.solution[i][j])
				{
					countRows++;
				}
				else if (countRows != 0)
				{
					clueRows.push({number: countRows, painted: false});
					countRows = 0;
				}

				if (this.solution[j][i])
				{
					countColumns++;
				}
				else if (countColumns != 0)
				{
					clueColumns.push({number: countColumns, painted: false});
					countColumns = 0;
				}
			}

			if (countRows != 0 || this.clues.rows.length == 0)
			{
				clueRows.push({number: countRows, painted: countRows == 0});
			}

			if (countColumns != 0 || this.clues.columns.length == 0)
			{
				clueColumns.push({number: countColumns, painted: countColumns == 0});
			}

			this.clues.rows.push(clueRows);
			this.clues.columns.push(clueColumns);
		}
    };

	this.generateClues = function()
	{


		for (i = 0 ; i < this.rows ; i++)
		{
			var countRows = 0;
			var countColumns = 0;
			var clueRows = [];
			var clueColumns = [];

			for (j = 0 ; j < this.columns ; j++)
			{
				if (this.solution[i][j])
				{
					countRows++;
				}
				else if (countRows != 0)
				{
					clueRows.push({number: countRows, painted: false});
					countRows = 0;
				}

				if (this.solution[j][i])
				{
					countColumns++;
				}
				else if (countColumns != 0)
				{
					clueColumns.push({number: countColumns, painted: false});
					countColumns = 0;
				}
			}

			if (countRows != 0 || this.clues.rows.length == 0)
			{
				clueRows.push({number: countRows, painted: countRows == 0});
			}

			if (countColumns != 0 || this.clues.columns.length == 0)
			{
				clueColumns.push({number: countColumns, painted: countColumns == 0});
			}

			this.clues.rows.push(clueRows);
			this.clues.columns.push(clueColumns);
		}
    };

  	this.paint = function(row, column) 
  	{
		switch (this.grid[row][column]) 
		{
		    case 'empty':
			    if (this.solution[row][column]) 
			    {
			    	this.grid[row][column] = 'paint';

			    	this.checkSolved();
			    }
			    else
			    {
			    	this.grid[row][column] = 'fail';
			    }
			   	this.updateClues(row, column);
		        break;
		    case 'mark':
		        this.grid[row][column] = 'empty';
		       	this.updateClues(row, column);
		        break;
		    default:
		    	break;
		}
    };

    this.mark = function(column, row) 
    {
		switch (this.grid[column][row]) 
		{
		    case 'empty':
		        this.grid[column][row] = 'mark';
		        break;
		    case 'mark':
		        this.grid[column][row] = 'empty';
		        break;
		    default:
		    	break;
		}

		this.updateClues(column, row);
    };

    this.updateClues = function(row, column)
   	{
   		if (this.clues.rows[row][0].number == 0)
   		{
   			return;
   		}

   		for (i in this.clues.rows[row])
   		{
   			this.clues.rows[row][i].painted = false;
   		}

		var countRows = 0;
		var index = 0;

   		// Update from left to right
   		for (i in this.grid[row])
   		{
   			var cell = this.grid[row][i];

   			if (cell === 'paint')
   			{
   				countRows++;
   			}
    		else if (cell !== 'empty')
   			{
   				if (!this.solution[row][i] && countRows == 0)
   				{
   					break;
   				}
   				else if (this.clues.rows[row][index].number == countRows)
   				{
	   				this.clues.rows[row][index].painted = true;
	   				countRows = 0;
	   				index++;
   				}
   			}
   			else if (countRows != 0)
   			{
   				break;
   			}
   		}

   		if (this.clues.rows[row][index].number == countRows && index == this.clues.rows[row].length-1)
   		{
   			this.clues.rows[row][index].painted = true;
   		}
   	};

    this.checkSolved = function()
   	{
   		return this.grid.every(function(elem, currentIndex) 
   		{
   			return elem.every(function(elem2, currentIndex2) 
   			{
   				return (elem2 == 'paint') == this.solution[currentIndex][currentIndex2];

   			}.bind(this));

		}.bind(this));
   	};

   	this.generateClues();
});