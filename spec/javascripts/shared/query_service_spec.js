describe('QueryService', function() {
  beforeEach(module('sfbike'));
  beforeEach(inject(function($injector, $window){
    this.window = $window;
    this.service = $injector.get('QueryService');
  }));

  describe('#instantiation', function() {
    it('instantiates values', function() {
      expect(this.service.models).toEqual({ coords:{} });
    });
  });
});