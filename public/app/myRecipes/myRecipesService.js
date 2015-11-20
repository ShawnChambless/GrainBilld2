angular.module('GrainBilld')
.service('myRecipesService', function($http) {

    this.getRecipes = function(userId) {
        return $http({
            method: 'GET',
            url: '/api/user/recipes/' + userId
        });
    };

    this.removeRecipe = function(recipeId) {
        return $http({
            method: 'PUT',
            url: '/api/user/recipes/remove/' + recipeId
        }).then(function(resp) {
            return resp.data;
        });
    };

});
