angular.module('GrainBilld')
.controller('newBatchController', function($scope, newBatchService, getGrain, getHops, getYeast, $rootScope, $state) {
    $scope.grainInDb        = getGrain;
    $scope.hopsInDb         = getHops;
    $scope.yeastInDb        = getYeast;
    $scope.grainInRecipe    = newBatchService.grainInRecipe;
    $scope.hopsInRecipe     = newBatchService.hopsInRecipe;
    $scope.yeastInRecipe    = newBatchService.yeastInRecipe;
    $scope.grainValues      = newBatchService.grainValues;
    $scope.hopsValues       = newBatchService.hopsValues;
    $scope.yeastValues      = newBatchService.yeastValues;
    $scope.grains           = 'grain';
    $scope.hopss            = 'hops';
    $scope.yeasts           = 'yeast';
    $scope.recipe           = {};
    $scope.recipe.isPrivate = true;

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

    $scope.saveRecipeToUser = function(recipe, isPrivate) {
        var user = $scope.currentUser.id;
        newBatchService.saveRecipeToUser(recipe, isPrivate, user).then(function(resp) {
            $scope.grainValues = $scope.hopsValues = $scope.yeastValues = 0;
            newBatchService.grainValues = newBatchService.hopsValues = newBatchService.yeastValues = 0;
            $scope.grainInRecipe = $scope.hopsInRecipe = $scope.yeastInRecipe = [];
            newBatchService.grainInRecipe = newBatchService.hopsInRecipe = newBatchService.yeastInRecipe = [];
            $scope.showGrain = $scope.showHops = $scope.showYeast = false;
            $scope.recipe = '';
            $state.reload();
        });
    };

});
