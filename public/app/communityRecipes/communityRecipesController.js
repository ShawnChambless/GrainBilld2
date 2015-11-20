angular.module('GrainBilld')
.controller('communityRecipesController', function($scope, communityRecipesService, getCommunityRecipes) {
    $scope.recipes = getCommunityRecipes.recipes;

});
