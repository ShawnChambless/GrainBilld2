angular.module('GrainBilld')
.controller('myRecipesController', function($scope, myRecipesService, $rootScope, checkUserLoggedIn) {
    
    $scope.recipes = checkUserLoggedIn.recipes;

});
