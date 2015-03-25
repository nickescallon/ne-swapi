(function() {
  angular.module('ne.swapi')
  .factory('swapi', swapi)

  swapi.$inject = ['$http', '$q', 'endpoints'];
  function swapi($http, $q, endpoints) {
    var service = {
      get: get,
      films: generateInterface(endpoints.FILMS),
      people: generateInterface(endpoints.PEOPLE),
      planets: generateInterface(endpoints.PLANETS),
      species: generateInterface(endpoints.SPECIES),
      starships: generateInterface(endpoints.STARSHIPS),
      vehicles: generateInterface(endpoints.VEHICLES)
    };

    return service;

    function generateInterface(url) {
      return {
        all: getAll(url),
        id: getRecord(url),
        get: function() { return get(url)},
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
        return get( url + (id || '1') + '/' );
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
