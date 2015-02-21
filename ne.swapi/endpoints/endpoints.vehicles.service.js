(function() {
  angular.module('ne.swapi.endpoints.vehicles', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiVehicles', swapiVehicles);

  swapiVehicles.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiVehicles(apiHelpers, ENDPOINTS) {

    var service = {
      byId: byId,
      byPage: byPage,
      all: all
    };

    return service;

    function byId(id) {
      return apiHelpers.getRecord(ENPOINTS.VEHICLES, id);
    }

    function byPage(pageNumber) {
      return apiHelpers.getPaged(ENDPOINTS.VEHICLES, pageNumber);
    }

    function all() {
      return apiHelpers.getAll(ENDPOINTS.VEHICLES);
    }

  }

})();
