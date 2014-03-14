describe('NavPaneCtrl', function() {
  beforeEach(module('sfbike'));

  beforeEach(inject(function($rootScope, $controller, QueryService, MapService) {
    this.rootScope = $rootScope;
    this.queryService = QueryService;
    this.mapService = MapService;
    this.scope = this.rootScope.$new();
    $controller('NavPaneCtrl', {$scope: this.scope});
  }));

  describe('#instantiates', function() {
    it('assigns values', function() {
      expect(this.scope.queryModels).toEqual(this.queryService.models);
      expect(this.scope.mapModels).toEqual(this.mapService.models);
      expect(this.scope.models).toEqual({ query: {}, queryInput: { address: '' } });
    });
  });

  describe('#query', function() {
    beforeEach(function() {
      returnValue = {
        then: function(callback) {
          callback('bar');
        }
      };

      spyOn(this.queryService, 'save').andReturn(returnValue);
      spyOn(this.scope, 'renderQuery');
      this.scope.query('foo');
    });

    it('calls and sets', function() {
      expect(this.queryService.save).toHaveBeenCalledWith('foo');
      expect(this.queryService.save.callCount).toEqual(1);
      expect(this.scope.renderQuery).toHaveBeenCalledWith('bar');
      expect(this.scope.renderQuery.callCount).toEqual(1);
    });
  });

  describe('#renderDirections', function() {
    beforeEach(function() {
      spyOn(this.mapService, 'bicycleDirections');
      this.scope.renderDirections('foo', 'bar');
    });

    it('calls the service', function() {
      expect(this.mapService.bicycleDirections).toHaveBeenCalledWith('foo','bar');
      expect(this.mapService.bicycleDirections.callCount).toEqual(1);
    });
  });

  describe('#renderQuery', function() {
    beforeEach(function() {
      spyOn(this.mapService, 'setMapCenter');
      spyOn(this.scope, 'renderDirections');
    });

    describe('when the query length is 0', function() {
      beforeEach(function() {
        queryValue = { nearby_parking: [], latitude: 'foo', longitude: 'bar' }
        this.scope.renderQuery(queryValue);
      });

      it('triggers the right calls', function() {
        expect(this.mapService.setMapCenter).toHaveBeenCalledWith('foo', 'bar');
        expect(this.mapService.setMapCenter.callCount).toEqual(1);
        expect(this.scope.renderDirections).not.toHaveBeenCalled();
      });
    });

    describe('when the query does not have parking', function() {
      beforeEach(function() {
        queryValue = {latitude: 'foo', longitude: 'bar'};
        this.scope.renderQuery(queryValue);
      });

      it('triggers the right calls', function() {
        expect(this.mapService.setMapCenter).toHaveBeenCalledWith('foo', 'bar');
        expect(this.mapService.setMapCenter.callCount).toEqual(1);
        expect(this.scope.renderDirections).not.toHaveBeenCalled();
      });
    });

    describe('when the query length is greater then 0', function() {
      beforeEach(function() {
        this.queryValue = {nearby_parking: [1,2,3], latitude: 'foo', longitude: 'bar'};
        this.scope.renderQuery(this.queryValue);
      });

      it('triggers the right calls', function() {
        expect(this.mapService.setMapCenter).toHaveBeenCalledWith('foo', 'bar');
        expect(this.mapService.setMapCenter.callCount).toEqual(1);
        expect(this.scope.renderDirections).toHaveBeenCalledWith(this.queryValue, 1);
        expect(this.scope.renderDirections.callCount).toEqual(1);
      });
    });
  });
});
