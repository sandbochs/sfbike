angular.module('sfbike').service('QueryService', ['$window', '$http', '$q', function(window, http, q) {
  var service, models;
  models = { coords: {} };
  service = { models: models, query: {} };

  service.query.post = function(params) {
    var config = {
      url: '/queries',
      method: 'post',
      data: params,
      responseType: 'json'
    }

    return http(config);
  }

  service.getLocation = function() {
    var deferred = q.defer();

    if(window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(function(pos) {
        models.coords.latitude = pos.coords.latitude;
        models.coords.longitude = pos.coords.longitude;
        deferred.resolve(pos);
      });
    }

    return deferred.promise;
  };

  return service;
}]);
