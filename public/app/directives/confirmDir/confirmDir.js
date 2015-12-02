angular.module('GrainBilld')
.directive('confirmDir', function(myRecipesService) {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/confirmDir/confirmDirTmpl.html',
        link: function(scope, elem, attrs) {
            scope.removeRecipe = function(recipeId, index) {
                myRecipesService.removeRecipe(recipeId).then(function() {
                    scope.recipes.splice(index, 1);
                    scope.showConfirmBox = !scope.showConfirmBox;
                });
            };
        }
    };
});
