(function() {
  angular.module('ne.swapi', [
    'ne.swapi.constants.endpoints',
    'ne.swapi.api'
  ])
  .factory('swapi', swapi);

  swapi.$inject = ['endpoints', 'api'];
  function swapi(endpoints, api) {

    var service = {
      get: api.get,
      films: api.generate(endpoints.FILMS),
      people: api.generate(endpoints.PEOPLE),
      planets: api.generate(endpoints.PLANETS),
      species: api.generate(endpoints.SPECIES),
      starships: api.generate(endpoints.STARSHIPS),
      vehicles: api.generate(endpoints.VEHICLES)
    };

    return service;
  }

})();
