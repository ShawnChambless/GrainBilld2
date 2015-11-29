angular.module('GrainBilld')
.controller('ingredientInfoController', function($scope, ingredientInfoService, getIngredients) {

    $scope.grain = getIngredients.grain;
    $scope.hops = getIngredients.hops;
    $scope.yeast = getIngredients.yeast;

    $scope.rotate90 = function(ingredient, id) {
        document.getElementById(ingredient + id).classList.toggle('rotated90');
    };

});
