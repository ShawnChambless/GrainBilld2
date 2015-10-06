angular.module('GrainBilld')
.controller('newBatchController', function($scope, newBatchService, getGrain, getHops, getYeast) {

    $scope.grainInDb        = getGrain;
    $scope.hopsInDb         = getHops;
    $scope.yeastInDb        = getYeast;
    $scope.grainInRecipe    = newBatchService.grainInRecipe;
    $scope.hopsInRecipe     = newBatchService.hopsInRecipe;
    $scope.yeastInRecipe    = newBatchService.yeastInRecipe;
    $scope.grains           = 'grain';
    $scope.hopss            = 'hops';
    $scope.yeasts           = 'yeast';

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

    $scope.removeGrain = function(index) {
        newBatchService.grainInRecipe.splice(index, 1);
    };

    $scope.removeHops = function(index) {
        newBatchService.hopsInRecipe.splice(index, 1);
    };

    $scope.removeYeast = function(index) {
        newBatchService.yeastInRecipe.splice(index, 1);
    };

});
