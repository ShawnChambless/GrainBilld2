angular.module('GrainBilld')
.service('homeService', function($http) {

    this.getGrain = function() {
        return $http({
            method: 'GET',
            url:    'http://localhost:8080/api/database/ingredients/grain'
        });
    };
    this.getHops = function() {
        return $http({
            method: 'GET',
            url:    'http://localhost:8080/api/database/ingredients/hops'
        });
    };

    this.getYeast = function() {
        return $http({
            method: 'GET',
            url:    'http://localhost:8080/api/database/ingredients/yeast'
        });
    };

    this.getRecipeTotals = function() {
        return $http.get('/api/recipes');
    };


});
