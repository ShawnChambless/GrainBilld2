angular.module('GrainBilld')
.service('recipeService', function($http) {

    this.getRecipe = function(id) {
        return $http.get('/api/recipe/' + id);
    };

});
