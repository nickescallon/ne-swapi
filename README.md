# ne-swapi
an angular module for [SWAPI](https://swapi.co)

## Get the Package
`$ bower install ne-swapi --save`
or
`npm install ne-swapi --save`

## First Inject the Module as an App Dependency
`$ angular.module('myApp', ['ne.swapi'])`

## Then Inject the swapi Service Into Your Components
controller usage:
```javascript
angular.module('myApp')
.controller('starshipsController', function($scope, swapi) {
  swapi.starships.all()
  .then(function(starships) {
    $scope.starships = starships;
  });
});
```

route resolve usage:
```javascript
angular.module('myApp')
.config(function($routeProvider) {
  $routeProvider
   .when('/starships', {
      templateUrl: 'starships.html',
      controller: 'starshipsController',
      resolve: {
        starships: function(swapi) {
          return swapi.starships.all();
        }
      }
    }
  });
});
```

## Use It
[ne-swapi](https://github.com/nickescallon/ne-swapi) provides one general purpose helper method:
* `swapi.get(url)` gets the resource(s) at the given url

and the following 5 helper methods for each of the [SWAPI](https://swapi.co) endpoints (films, people, planets, species, starships, vehicles):
* `.all()` returns a promise that resolves to all resources (not paginated)
  * sample: `swapi.films.all()`
* `.id(id)` returns a promise that resolves to a specific resource (defaults to 1)
  * sample: `swapi.people.id(5)`
* `.get()` returns a promise that resolves to the first page of resources
  * sample: `swapi.planets.get()`
* `.page(page)` returns a promise that resolves to the nth page of resources (defaults to 1)
  * sample: `swapi.species.page(3)`
* `.schema()` returns a promise that resolves to the resource schema
  * sample: `swapi.starships.schema()`

## More Samples

### swapi.get(url)
A wrapper for `$http.get`.
```javascript
swapi.get('http://swapi.co/api/people/1/')
.then(function(person) {
  $scope.person = person; // {"name": "Luke Skywalker", "height": "172", ...}
});
```

### swapi.vehicles.all()

```javascript
swapi.vehicles.all()
.then(function(allVehicles) {
  $scope.vehicles = allVehicles; // {"count": 39, "results": [{"name": "Sand Crawler", ...} ...] ...}
});
```

### swapi.films.id()

```javascript
swapi.films.id(3)
.then(function(film) {
  $scope.film = film; // {"title": "Return of the Jedi", "episode_id": 6, ...}
});
```

### swapi.people.get()

```javascript
swapi.people.get()
.then(function(people) {
  $scope.people = people; // {"count": 82, "next": "http://swapi.co/api/people/?page=2", ...}
});
```

### swapi.people.page()

```javascript
swapi.people.page(3)
.then(function(people) {
  $scope.people = people; // {"count": 82, "next": "http://swapi.co/api/people/?page=4", ...}
});
```

### swapi.species.schema()
```javascript
swapi.species.schema()
.then(function(speciesSchema) {
  $scope.schema = speciesSchema; // {"required": ["name", "height", "mass", ...] ...}
});
```

### chaining
since all methods return [promises](https://docs.angularjs.org/api/ng/service/$q), you can chain calls:
```javascript
swapi.films.id(2)
.then(function(film) {
  return swapi.get(film.characters[0]);
})
.then(function(person) {
  return swapi.get(person.vehicles[1]);
})
.then(function(vehicle) {
  $scope.vehicle = vehicle;
})
.catch(function(error) {
  //any error in the chain will fall through to here and skip subsequent .then calls
})
```
