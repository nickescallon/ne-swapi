(function() {
  angular.module('ne.swapi.api', [
    'ne.swapi.endpoints.people',
    'ne.swapi.endpoints.films',
    'ne.swapi.endpoints.starships',
    'ne.swapi.endpoints.vehicles',
    'ne.swapi.endpoints.species',
    'ne.swapi.endpoints.planets'
  ])
  .factory('swapi', swapi);

  swapi.$inject = ['swapiPeople', 'swapiFilms', 'swapiStarships', 'swapiVehicles', 'swapiSpecies', 'swapiPlanets'];
  function swapi(swapiPeople, swapiFilms, swapiStarships, swapiVehicles, swapiSpecies, swapiPlanets) {

    var service = {
      people: swapiPeople,
      films: swapiFilms,
      starships: swapiStarships,
      vehicles: swapiVehicles,
      species: swapiSpecies,
      planets: swapiPlanets
    };

    return service;
  }

})();
