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
