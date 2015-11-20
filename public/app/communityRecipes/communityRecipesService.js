angular.module('GrainBilld')
.service('communityRecipesService', function($http) {

    this.getCommunityRecipes = function() {
        return $http({
            method: 'GET',
            url: '/api/recipes/community'
        });
    };

});
