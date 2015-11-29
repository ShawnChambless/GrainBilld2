angular.module('GrainBilld')
.controller('homeCtrl', function($scope, homeService, $cookies, getRecipeTotals, getCommunityRecipes) {
    $scope.totalCount = getRecipeTotals.totalCount;
    $scope.totalCommunity = getRecipeTotals.totalCommunity;
    if(getRecipeTotals.totalCommunity < 2) $scope.recipe = 'recipe';
    else $scope.recipe = 'recipes';

    $scope.communityRecipes = getCommunityRecipes;

});
