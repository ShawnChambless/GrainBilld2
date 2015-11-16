angular.module('GrainBilld')
.controller('communityRecipesController', function($scope, communityRecipesService, getCommunityRecipes) {
    console.log(getCommunityRecipes.recipes);
    $scope.recipes = getCommunityRecipes.recipes;

});
