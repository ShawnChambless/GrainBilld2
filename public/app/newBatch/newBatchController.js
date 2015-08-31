angular.module('GrainBilld')
.controller('newBatchController', function($scope, newBatchService, homeService, getGrain, getHops, getYeast) {

    $scope.grain            = getGrain;
    $scope.hops             = getHops;
    $scope.yeast            = getYeast;
    $scope.recipeGrain      = newBatchService.grainInRecipe;
    $scope.recipeHops       = newBatchService.hopsInRecipe;
    $scope.recipeYeast      = newBatchService.yeastInRecipe;

    $scope.showGrainData = function() {
        $scope.showGrain    = true;
        $scope.showHops     = false;
        $scope.showYeast    = false;
    };

    $scope.showHopsData = function() {
        $scope.showGrain  = false;
        $scope.showHops   = true;
        $scope.showYeast  = false;
    };

    $scope.showYeastData = function() {
        $scope.showGrain    = false;
        $scope.showHops     = false;
        $scope.showYeast    = true;
    };

    $scope.addGrainToRecipe = function(grain) {
        newBatchService.addGrainToRecipe(grain);
        console.log(newBatchService.grainInRecipe);
    };

    $scope.addHopsToRecipe = function(hops) {
        newBatchService.addHopsToRecipe(hops);
        console.log(newBatchService.hopsInRecipe);
    };

    $scope.addYeastToRecipe = function(yeast) {
        newBatchService.addYeastToRecipe(yeast);
        console.log(newBatchService.yeastInRecipe);
    };

});
