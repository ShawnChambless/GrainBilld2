angular.module('GrainBilld')
.controller('communityRecipesController', function($scope, communityRecipesService, getCommunityRecipes, myRecipesService) {
    $scope.recipes = getCommunityRecipes.recipes;
});
