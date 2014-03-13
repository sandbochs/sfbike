angular.module('sfbike').controller('MapPaneCtrl', ['$scope', 'QueryService', function(scope, locationService) {
  window.l = locationService;
  scope.test = 'Map Ctrl';
}]);
