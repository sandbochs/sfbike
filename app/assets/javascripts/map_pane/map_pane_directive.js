angular.module('sfbike').directive('mapPane', function() {
  return {
    restrict: 'A',
    scope: {},
    controller: 'MapPaneCtrl',
    templateUrl: '/templates/map_pane.html',
    link: function(scope, el, attrs) {
    }
  };
});
