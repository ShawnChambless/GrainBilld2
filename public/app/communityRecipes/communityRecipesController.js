angular.module('GrainBilld')
.controller('communityRecipesController', function($scope, communityRecipesService, getCommunityRecipes, myRecipesService) {
    $scope.recipes = getCommunityRecipes.recipes;
    $scope.removeRecipe = function(recipeId, index) {
        myRecipesService.removeRecipe(recipeId, $scope.currentUser.id).then(function() {
            $scope.recipes.splice(index, 1);
        }, function(err) {
            return err;
        });
    };

});
