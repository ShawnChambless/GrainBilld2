angular.module('GrainBilld')
.service('newBatchService', function() {
    var recipeStats   = [{og: 0}];
    this.grainInRecipe = [];
    this.hopsInRecipe  = [];
    this.yeastInRecipe = [];


    this.addIngredient = function(ingredientType, ingredient) {
        addIngredient(ingredientType, ingredient);
        console.log(this.grainInRecipe);
    };

    var addGrainToRecipe = function(grain, calcOg, calcSRM) {
        this.grainInRecipe.push({grain: grain, amount: 10, batchSize: 10});
        var OG = calcOg(grain);
        var SRM = calcSRM(grain);
        return OG(), SRM(), this.grainInRecipe;
    }.bind(this);

    var calculateOGOfRecipe = function(grain) {
        var og = 1.000, gpOfGrain = 0, itemToAdd = 0, batchSize = 10, amount = 10, sg = parseFloat(grain.sg);
        return function() {
            if (!itemToAdd) {
                itemToAdd = ((sg - 1)*1000 * amount);
                gpOfGrain = itemToAdd;
            } else {
                gpOfGrain = (itemToAdd + ((sg - 1)*1000) * amount);
                itemToAdd = gpOfGrain;
            }
            og = ((gpOfGrain * 0.75 / batchSize)/1000 + 1).toFixed(3);
            recipeStats.find(function(ele) { ele.og += parseFloat(og); });
            console.log(recipeStats[0].og);
            return og;
        };
    }.bind(this);

    var calculateSRMOfRecipe = function(grain) {
        var recipeSrm = 0, MCU = 0, amount = 10, batchSize = 10, lovibond = parseFloat(grain.lovibond);
        return function() {
            MCU = ((lovibond * amount)/batchSize);
            recipeSrm += (1.4922*(Math.pow(MCU, 0.6859))).toFixed(1);
            return recipeSrm;
        };

    };

    function addIngredient(ingredientType, ingredient) {
        switch(ingredientType) {
            case 'grain':
                addGrainToRecipe(ingredient, calculateOGOfRecipe, calculateSRMOfRecipe);
                break;
            case 'hops':
                addHopsToRecipe(ingredient);
                break;
            case 'yeast':
                addYeastToRecipe(ingredient);
                break;
        }
    }

});
