angular.module('sfbike', []);
angular.module('sfbike').config(['$httpProvider', function(httpProvider) {
  httpProvider.defaults.headers.common['Accept'] = 'application/json';
}]);
