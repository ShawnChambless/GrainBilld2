angular.module('GrainBilld')
.controller('newBatchController', function($scope, newBatchService, getGrain, getHops, getYeast, $rootScope, $state, $timeout) {
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
    $scope.recipe           = { isPrivate: true };
    $scope.amount           = 0;
    $scope.hops.boilTime    = 60;
    newBatchService.recipe  = $scope.recipe;

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

    $scope.saveRecipeToUser = function(recipe) {
        var user = $scope.currentUser.id;
        newBatchService.saveRecipeToUser(recipe, user).then(function(resp) {
            console.log(resp);
            $scope.response = resp;
            var flashSuccess = document.getElementById('flashSuccess');
            flashSuccess.classList.toggle('active');
            $timeout(function() {
                flashSuccess.classList.toggle('active');
            }, 3000);
            $scope.showGrain = $scope.showHops = $scope.showYeast = false;
            $scope.recipe = {}; $scope.grainInRecipe = newBatchService.grainInRecipe; $scope.hopsInRecipe = newBatchService.hopsInRecipe; $scope.yeastInRecipe = newBatchService.yeastInRecipe; $scope.grainValues = newBatchService.grainValues; $scope.hopsValues = newBatchService.hopsValues; $scope.yeastValues = newBatchService.yeastValues; $scope.recipe.isPrivate = true;
        }, function(err) {
            var flashError = document.getElementById('flashError');
            flashError.classList.toggle('active');
            $timeout(function() {
                flashError.classList.toggle('active');
            }, 3000);
        });
    };

});
