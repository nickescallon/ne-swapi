(function() {
  angular.module('ne.swapi.endpoints.films', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiFilms', swapiFilms);

  swapiFilms.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiFilms(apiHelpers, ENDPOINTS) {

    var service = {
      all: apiHelpers.getAll(ENDPOINTS.FILMS),
      byId: apiHelpers.getRecord(ENDPOINTS.FILMS),
      byPage: apiHelpers.getPaged(ENDPOINTS.FILMS),
      schema: apiHelpers.getSchema(ENDPOINTS.FILMS)
    };

    return service;
  }

})();
