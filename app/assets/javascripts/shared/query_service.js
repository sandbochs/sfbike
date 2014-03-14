angular.module('sfbike').service('QueryService', ['$window', '$http', '$q', function(window, http, q) {
  var models, service, priv;
  models = { coords: {} };
  service = { models: models, query: {} };
  priv = {};

  priv.queryPost = function(query) {
    var config = {
      url: '/queries',
      method: 'post',
      data: query,
      responseType: 'json'
    }

    return http(config);
  }

  service.save = function(query) {
    var deferred = q.defer();

    priv.queryPost(query).success(function(data) {
      deferred.resolve(data);
    });

    return deferred.promise;
  }

  service.getLocation = function() {
    var deferred = q.defer();

    if(window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(function(pos) {
        deferred.resolve(pos.coords);
      }, function(error) {
        deferred.reject(error);
      });
    }

    return deferred.promise;
  };

  return service;
}]);
