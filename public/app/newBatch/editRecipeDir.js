angular.module('GrainBilld')
.directive('editRecipe', function(newBatchService) {
    return {
        scope: {
            ingredient: '=',
            ingredientType: '=',
            amount: '=',
            boilTime: '='
        },
        template: '<p>{{ingredient.name}}</p>',
        link: function(scope, elem, attrs) {
            elem.on('click', function() {
                if(scope.ingredientType == 'hops') scope.ingredient.boilTime = scope.boilTime;
                scope.ingredient.amount = scope.amount;
                console.log(scope.ingredientType, scope.ingredient);
                newBatchService.addIngredient(scope.ingredientType, scope.ingredient);
                scope.$apply(scope.grainInRecipe, scope.hopsInRecipe, scope.yeastInRecipe, scope.grainValues, scope.hopsValues, scope.yeastValues);
            });
        }
    };
});
