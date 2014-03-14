angular.module('sfbike').directive('navPane', function() {
  return {
    restrict: 'A',
    scope: {},
    controller: 'NavPaneCtrl',
    templateUrl: '/templates/nav_pane.html'
  };
});
