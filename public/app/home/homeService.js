angular.module('GrainBilld')
.service('homeService', function($http, $q) {

    this.getGrain = function() {
        return $http({
            method: 'GET',
            url:    '/api/database/ingredients/grain'
        });
    };
    this.getHops = function() {
        return $http({
            method: 'GET',
            url:    '/api/database/ingredients/hops'
        });
    };

    this.getYeast = function() {
        return $http({
            method: 'GET',
            url:    '/api/database/ingredients/yeast'
        });
    };

    this.getRecipeTotals = function() {
        return $http.get('/api/recipes');
    };

});
