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

(function() {
  angular.module('ne.swapi.endpoints.helpers', [])
  .factory('apiHelpers', apiHelpers)

  apiHelpers.$inject = ['$http', '$q'];
  function apiHelpers($http, $q) {
    var service = {
      getAll: getAll,
      getRecord: getRecord,
      getPaged: getPaged,
      getSchema: getSchema
    };

    return service;

    function getAll(url) {
      return function() {
        var deferred = $q.defer(),
          results = [];

        fetchRecords(url);
        return deferred.promise;

        function fetchRecords(url) {
          $http.get(url)
          .then(function(response) {
            results = results.concat(response.data.results);
            if (typeof response.data.next === 'string') {
              fetchRecords(response.data.next)
            } else {
              deferred.resolve({count: results.length, results: results})
            }
          })
          .catch(function(error) {
            deferred.reject(error);
          });
        }
      }
    }

    function getRecord(url, id) {
      return function(id) {
        return $http.get( url + 'id/' + id + '/' );
      }
    }

    function getPaged(url) {
      return function(page) {
        return $http.get( url + '?page=' + (page || '') );
      }
    }

    function getSchema(url) {
      return function() {
        return $http.get( url + 'schema');
      }
    }
  }

})();

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

(function() {
  angular.module('ne.swapi.endpoints.vehicles', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiVehicles', swapiVehicles);

  swapiVehicles.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiVehicles(apiHelpers, ENDPOINTS) {

    var service = {
      all: apiHelpers.getAll(ENDPOINTS.PEOPLE),
      byId: apiHelpers.getRecord(ENDPOINTS.PEOPLE),
      byPage: apiHelpers.getPaged(ENDPOINTS.PEOPLE),
      schema: apiHelpers.getSchema(ENDPOINTS.PEOPLE)
    };

    return service;
  }

})();
