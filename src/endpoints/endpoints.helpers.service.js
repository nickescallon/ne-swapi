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
