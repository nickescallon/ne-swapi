(function() {
  angular.module('ne.swapi.endpoints.vehicles', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiVehicles', swapiVehicles);

  swapiVehicles.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiVehicles(apiHelpers, ENDPOINTS) {

    var service = {
      all: apiHelpers.getAll(ENDPOINTS.PEOPLE),
      byId: apiHelpers.getRecord(ENDPOINTS.PEOPLE),
      byPage: apiHelpers.getPaged(ENDPOINTS.PEOPLE),
      schema: apiHelpers.getSchema(ENDPOINTS.PEOPLE)
    };

    return service;
  }

})();
