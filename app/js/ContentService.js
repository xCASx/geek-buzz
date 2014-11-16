var contentService = angular.module('contentService',['ngResource']);

contentService.factory('Data', ['$resource',
  function($resource){
    return $resource('/v/:id', {}, {
      query: {method:'GET', params: {id: 1}}
    });
  }]);