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

(function() {
  angular.module('ne.swapi.constants.endpoints', [])
  .constant('endpoints', endpoints());

  function endpoints() {
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
  angular.module('ne.swapi.api', [])
  .factory('api', api)

  api.$inject = ['$http', '$q'];
  function api($http, $q) {
    var service = {
      get: get,
      generate: generate
    };

    return service;

    function generate(url) {
      return {
        all: getAll(url),
        id: getRecord(url),
        page: getPaged(url),
        schema: getSchema(url)
      };
    }

    function get(url) {
      return $http.get(url)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        $q.reject(error)
      });
    }

    function getAll(url) {
      return function() {
        var deferred = $q.defer(),
          results = [];

        fetchRecords(url);
        return deferred.promise;

        function fetchRecords(url) {
          get(url)
          .then(function(data) {
            results = results.concat(data.results);
            if (typeof data.next === 'string') {
              fetchRecords(data.next)
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

    function getRecord(url) {
      return function(id) {
        return get( url + 'id/' + (id || '1') + '/' );
      }
    }

    function getPaged(url) {
      return function(page) {
        return get( url + '?page=' + (page || '') );
      }
    }

    function getSchema(url) {
      return function() {
        return get( url + 'schema');
      }
    }
  }

})();
