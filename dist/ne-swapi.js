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
      byId: byId,
      byPage: byPage,
      all: all
    };

    return service;

    function byId(id) {
      return apiHelpers.getRecord(ENPOINTS.FILMS, id);
    }

    function byPage(pageNumber) {
      return apiHelpers.getPaged(ENDPOINTS.FILMS, pageNumber);
    }

    function all() {
      return apiHelpers.getAll(ENDPOINTS.FILMS);
    }

  }

})();

(function() {
  angular.module('ne.swapi.endpoints.helpers', [])
  .factory('apiHelpers', apiHelpers)

  apiHelpers.$inject = ['$http', '$q'];
  function apiHelpers($http, $q) {
    var service = {
      get: get,
      getRecord: getRecord,
      getPaged: getPaged,
      getSchema: getSchema,
      getAll: getAll
    };

    return service;

    function get(url) {
      return $http.get(url);
    }

    function getPaged(url, page) {
      return $http.get( url + '?page=' + (page || '') );
    }

    function getRecord(url, id) {
      return $http.get( url + 'id/' + id + '/' );
    }

    function getSchema(url) {
      return $http.get( url + 'schema')
    }

    function getAll(url) {
      var service = this,
          deferred = $q.defer(),
          results = [];

      fetchRecords(url);
      return deferred.promise;

      function fetchRecords(url) {
        service.get(url)
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

})();

(function() {
  angular.module('ne.swapi.endpoints.people', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiPeople', swapiPeople);

  swapiPeople.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiPeople(apiHelpers, ENDPOINTS) {

    var service = {
      byId: byId,
      byPage: byPage,
      all: all
    };

    return service;

    function byId(id) {
      return apiHelpers.getRecord(ENPOINTS.PEOPLE, id);
    }

    function byPage(pageNumber) {
      return apiHelpers.getPaged(ENDPOINTS.PEOPLE, pageNumber);
    }

    function all() {
      return apiHelpers.getAll(ENDPOINTS.PEOPLE);
    }

  }

})();

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

(function() {
  angular.module('ne.swapi.endpoints.species', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiSpecies', swapiSpecies);

  swapiSpecies.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiSpecies(apiHelpers, ENDPOINTS) {

    var service = {
      byId: byId,
      byPage: byPage,
      all: all
    };

    return service;

    function byId(id) {
      return apiHelpers.getRecord(ENPOINTS.SPECIES, id);
    }

    function byPage(pageNumber) {
      return apiHelpers.getPaged(ENDPOINTS.SPECIES, pageNumber);
    }

    function all() {
      return apiHelpers.getAll(ENDPOINTS.SPECIES);
    }

  }

})();

(function() {
  angular.module('ne.swapi.endpoints.starships', ['ne.swapi.endpoints.helpers', 'ne.swapi.endpoints.constants'])
  .factory('swapiStarships', swapiStarships);

  swapiStarships.$inject = ['apiHelpers', 'ENDPOINTS'];
  function swapiStarships(apiHelpers, ENDPOINTS) {

    var service = {
      byId: byId,
      byPage: byPage,
      all: all
    };

    return service;

    function byId(id) {
      return apiHelpers.getRecord(ENPOINTS.STARSHIPS, id);
    }

    function byPage(pageNumber) {
      return apiHelpers.getPaged(ENDPOINTS.STARSHIPS, pageNumber);
    }

    function all() {
      return apiHelpers.getAll(ENDPOINTS.STARSHIPS);
    }

  }

})();

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
