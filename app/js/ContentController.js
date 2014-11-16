var contentController = angular.module('contentController',['ngSanitize']);

contentController.controller('ContentController', ['$scope', '$sce', 'Data', function($scope, $sce, Data) {
  $scope.data = Data.query({}, function() {
    $scope.data.video = $sce.trustAsHtml($scope.data.video);
    $scope.data.$save();
    $scope.header = 'geek-buzz.com - ' + $scope.data.title;
    // TODO: find better way to set initial state
    $('#input-id').rating('update', $scope.data.rating);
  });
}]);