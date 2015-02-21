(function() {
  angular.module('ne.swapi.endpoints.planets', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiPlanets', swapiPlanets);

  swapiPlanets.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiPlanets(apiHelpers, ENDPOINTS) {

    var service = {
      byId: byId,
      byPage: byPage,
      all: all
    };

    return service;

    function byId(id) {
      return apiHelpers.getRecord(ENPOINTS.PLANETS, id);
    }

    function byPage(pageNumber) {
      return apiHelpers.getPaged(ENDPOINTS.PLANETS, pageNumber);
    }

    function all() {
      return apiHelpers.getAll(ENDPOINTS.PLANETS);
    }

  }

})();
