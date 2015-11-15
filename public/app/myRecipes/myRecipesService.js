angular.module('GrainBilld')
.service('myRecipesService', function($http) {

    this.getRecipes = function(userId) {
        return $http({
            method: 'GET',
            url: '/api/user/recipes/' + userId
        });
    };

});
