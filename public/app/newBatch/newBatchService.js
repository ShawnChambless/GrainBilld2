angular.module('GrainBilld')
.service('newBatchService', function($http) {
    this.grainInRecipe = [];
    this.addGrainToRecipe = function(grainId) {
        this.grainInRecipe.push({name: grainId});
        console.log(this.grainInRecipe);
    };

});
