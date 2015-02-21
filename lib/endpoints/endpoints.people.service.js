(function() {
  angular.module('ne.swapi.endpoints.people', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiPeople', swapiPeople);

  swapiPeople.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiPeople(apiHelpers, ENDPOINTS) {

    var service = {
      all: apiHelpers.getAll(ENDPOINTS.PEOPLE),
      byId: apiHelpers.getRecord(ENDPOINTS.PEOPLE),
      byPage: apiHelpers.getPaged(ENDPOINTS.PEOPLE),
      schema: apiHelpers.getSchema(ENDPOINTS.PEOPLE)
    };

    return service;
  }

})();
