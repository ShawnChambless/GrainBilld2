angular.module('GrainBilld')
.controller('myRecipesController', function($scope, myRecipesService, $rootScope, checkUserLoggedIn) {

    $scope.recipes = checkUserLoggedIn.recipes;
    $scope.removeRecipe = function(recipeId, index) {
        myRecipesService.removeRecipe(recipeId).then(function() {
            $scope.recipes.splice(index, 1);
        });
    };
});
