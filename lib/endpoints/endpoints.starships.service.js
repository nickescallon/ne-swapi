(function() {
  angular.module('ne.swapi.endpoints.starships', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiStarships', swapiStarships);

  swapiStarships.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiStarships(apiHelpers, ENDPOINTS) {

    var service = {
      all: apiHelpers.getAll(ENDPOINTS.STARSHIPS),
      byId: apiHelpers.getRecord(ENDPOINTS.STARSHIPS),
      byPage: apiHelpers.getPaged(ENDPOINTS.STARSHIPS),
      schema: apiHelpers.getSchema(ENDPOINTS.STARSHIPS)
    };

    return service;
  }

})();
