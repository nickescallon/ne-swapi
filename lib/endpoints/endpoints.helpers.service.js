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
        return $http.get( url + 'id/' + (id || '1') + '/' );
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
