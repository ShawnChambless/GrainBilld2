angular.module('GrainBilld')
.service('myRecipesService', function($http) {

    this.getRecipes = function(userId) {
        return $http({
            method: 'GET',
            url: '/api/user/recipes/' + userId
        });
    };

    this.removeRecipe = function(recipeId, userId) {
        return $http({
            method: 'PUT',
            url: '/api/user/recipes/remove',
            data: {
                recipeId: recipeId,
                userId: userId
            }
        }).then(function(resp) {
            return resp.data;
        });
    };

});
