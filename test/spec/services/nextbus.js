'use strict';

describe('Service: nextbus', function () {

  // load the service's module
  beforeEach(module('ttcMapperApp'));

  // instantiate service
  var nextbus;
  beforeEach(inject(function (_nextbus_) {
    nextbus = _nextbus_;
  }));

  it('should do something', function () {
    expect(!!nextbus).toBe(true);
  });

});
