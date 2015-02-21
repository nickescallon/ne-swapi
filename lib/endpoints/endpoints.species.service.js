(function() {
  angular.module('ne.swapi.endpoints.species', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiSpecies', swapiSpecies);

  swapiSpecies.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiSpecies(apiHelpers, ENDPOINTS) {

    var service = {
      all: apiHelpers.getAll(ENDPOINTS.SPECIES),
      byId: apiHelpers.getRecord(ENDPOINTS.SPECIES),
      byPage: apiHelpers.getPaged(ENDPOINTS.SPECIES),
      schema: apiHelpers.getSchema(ENDPOINTS.SPECIES)
    };

    return service;
  }

})();
