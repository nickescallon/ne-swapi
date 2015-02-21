(function() {
  angular.module('ne.swapi.endpoints.constants', [])
  .constant('ENDPOINTS', ENDPOINTS())
  .constant('PAGE_PARAM', '?people=');

  function ENDPOINTS() {
    var root = 'https://swapi.co/api/',
        people = 'people/',
        films = 'films/',
        starships = 'starships/',
        vehicles = 'vehicles/',
        species = 'species/',
        planets = 'planets/'

    return {
      ROOT: root,
      PEOPLE: root + people,
      FILMS: root + films,
      STARSHIPS: root + starships,
      VEHICLES: root + vehicles,
      SPECIES: root + species,
      PLANETS: root + planets
    };
  }

})();
