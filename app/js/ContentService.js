var contentService = angular.module('contentService',['ngResource']);

contentService.factory('Data', ['$resource',
  function($resource){
    return $resource('/:fileName', {}, {
      query: {method:'GET', params:{fileName:'data'}}
    });
  }]);