angular.module('GrainBilld')
.controller('ingredientInfoController', function($scope, ingredientInfoService, getIngredients) {

    $scope.grain = getIngredients.grain;
    $scope.hops = getIngredients.hops;
    $scope.yeast = getIngredients.yeast;

});
