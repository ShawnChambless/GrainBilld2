angular.module('GrainBilld')
.directive('editRecipe', function(newBatchService) {
    return {
        scope: {
            ingredient: '=',
            ingredientType: '='
        },
        template: '<p>{{ingredient.name}}</p>',
        link: function(scope, elem, attrs) {
            elem.on('click', function() {
                newBatchService.addIngredient(scope.ingredientType, scope.ingredient);
                scope.$apply(scope.grainInRecipe, scope.hopsInRecipe, scope.yeastInRecipe, scope.grainValues, scope.hopsValues, scope.yeastValues);
            });
        }
    };
});
