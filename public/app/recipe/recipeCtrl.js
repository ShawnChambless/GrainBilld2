angular.module('GrainBilld')
.controller('recipeCtrl', function($scope, getRecipe) {

    $scope.recipe = getRecipe;
    console.log(getRecipe)
});
