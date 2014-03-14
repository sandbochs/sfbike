describe('MapPaneCtrl', function() {
  beforeEach(module('sfbike'));

  beforeEach(inject(function($rootScope, $controller, QueryService, MapService) {
    this.rootScope = $rootScope;
    this.queryService = QueryService;
    this.mapService = MapService;
    this.scope = this.rootScope.$new();
    $controller('MapPaneCtrl', {$scope: this.scope});
  }));

  describe('#instantiates', function() {
    it('assigns values', function() {
      expect(this.scope.queryModels).toEqual(this.queryService.models);
      expect(this.scope.mapModels).toEqual(this.mapService.models);
    });
  })
});
