(function() {
  angular.module('ne.swapi.endpoints.planets', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiPlanets', swapiPlanets);

  swapiPlanets.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiPlanets(apiHelpers, ENDPOINTS) {

    var service = {
      all: apiHelpers.getAll(ENDPOINTS.PLANETS),
      byId: apiHelpers.getRecord(ENDPOINTS.PLANETS),
      byPage: apiHelpers.getPaged(ENDPOINTS.PLANETS),
      schema: apiHelpers.getSchema(ENDPOINTS.PLANETS)
    };

    return service;
  }

})();
