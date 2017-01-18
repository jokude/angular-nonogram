'use strict';

(function(){

angular.module('app')
  .service('levelService', Levels);

function Levels() {

  var categories = [
    {
      id: 0,
      title: 'Animals',
      imageUrl: '',
    },
    {
      id: 1,
      title: 'Vehicles',
      imageUrl: ''
    },
    {
      id: 2,
      title: 'Food',
      imageUrl: ''
    },
    {
      id: 3,
      title: 'Home',
      imageUrl: ''
    },
    {
      id: 4,
      title: 'Life',
      imageUrl: ''
    },
    {
      id: 5,
      title: 'Building',
      imageUrl: ''
    },
    {
      id: 6,
      title: 'Vehicles',
      imageUrl: ''
    },
    {
      id: 7,
      title: 'Vehicles',
      imageUrl: ''
    },
    {
      id: 8,
      title: 'Vehicles',
      imageUrl: ''
    },
    {
      id: 9,
      title: 'Vehicles',
      imageUrl: ''
    },
    {
      id: 10,
      title: 'Vehicles',
      imageUrl: ''
    },
    {
      id: 11,
      title: 'Vehicles',
      imageUrl: ''
    },
    {
      id: 12,
      title: 'Vehicles',
      imageUrl: ''
    },
    {
      id: 13,
      title: 'Vehicles',
      imageUrl: ''
    },
  ];

  var levels = [
    {
      id: 0,
      title: 'Grid0',
      grid: [[true, false, false], [false, true, true], [true, false, true]],
      category: 0,
      size: 3
    },
    {
      id: 1,
      title: 'Grid1',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 2,
      title: 'Grid2',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 3,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 4,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 5,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 5
    },
    {
      id: 6,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
        {
      id: 7,
      title: 'Grid0',
      grid: [[true, false, false], [false, true, true], [true, false, true]],
      category: 0,
      size: 3
    },
    {
      id: 8,
      title: 'Grid1',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 9,
      title: 'Grid2',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 10,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 11,
      title: 'Grid3',
      grid: [[false, false, true, false], [false, false, true, true], [true, true, true, true], [true, false, true, false]],
      category: 0,
      size: 4
    },
    {
      id: 12,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 13,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
        {
      id: 14,
      title: 'Grid0',
      grid: [[true, false, false], [false, true, true], [true, false, true]],
      category: 0,
      size: 3
    },
    {
      id: 15,
      title: 'Grid1',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 16,
      title: 'Grid2',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 17,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 18,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 19,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    },
    {
      id: 20,
      title: 'Grid3',
      grid: [[false, false, true], [false, false, true], [true, true, true]],
      category: 0,
      size: 3
    }
  ];

  this.getCategories = function() {
    return categories;
  };

  this.getLevelsByCategory = function(categoryId) {
    return levels.filter(function(level){
      return categoryId == level.category ;
    });
  };

  this.getLevel = function(levelId) {
    return levels[levelId];
  };
};

})();