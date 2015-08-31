angular.module('GrainBilld')
.service('newBatchService', function($http) {
    this.grainInRecipe  = [{'name': 'GRAIN'}];
    this.hopsInRecipe   = [];
    this.yeastInRecipe  = [];
    this.addGrainToRecipe = function(grain) {
        if(this.grainInRecipe.indexOf(grain) === -1) {
            this.grainInRecipe.push(grain);
        }
    };

    this.addHopsToRecipe = function(hops) {
        if(this.hopsInRecipe.indexOf(hops) === -1) {
            this.hopsInRecipe.push(hops);
        }
    };

    this.addYeastToRecipe = function(yeast) {
        if(this.yeastInRecipe.indexOf(yeast) === -1) {
            this.yeastInRecipe.push(yeast);
        }
    };

});
