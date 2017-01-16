'use strict';

(function(){

angular.module('app')
  .config(routesConfig);

function routesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      component: 'main'
    })
    .state('main.categories', {
      url: '',
      component: 'categoryList'
    })
    .state('main.levels', {
      url: '/category/:categoryId',
      component: 'levelList'
    });
}

})();