angular.module('GrainBilld')
.service('newBatchService', function($http) {
    this.grainInRecipe = [];
    this.hopsInRecipe  = [];
    this.yeastInRecipe = [];
    this.grainValues   = { og: 0, fg: 0, srm: 0 };
    this.hopsValues    = { ibu: 0 };
    this.yeastValues   = { attenuation: 0, abv: 0 };
    var self = this;

    this.addIngredient = function(ingredientType, ingredient) {
        switch(ingredientType) {
            case 'grain':
                editGrainInRecipe(ingredient, self.grainInRecipe, self.grainValues, self.yeastValues);
                break;
            case 'hops':
                editHopsInRecipe(ingredient, self.hopsInRecipe, self.hopsValues);
                break;
            case 'yeast':
                editYeastInRecipe(ingredient, self.yeastInRecipe, self.yeastValues, self.grainValues);
                break;
        }
    };

    function editGrainInRecipe(grain, arr, grainValues, yeastValues) {
        arr.push({
            name: grain.name,
            lovibond: grain.lovibond,
            sg: ((grain.sg - 1) * 1000).toFixed(1),
            amount: 5,
            description: grain.description
        });
        calcGrainTotals(arr, grainValues, yeastValues);
        self.grainValues.og = self.grainInRecipe.reduce(function(a, b) {
            return console.log(a.og, b.og);
        });
    }

    function calcGrainTotals(arr, grainValues, yeastValues) {
        var efficiency = 0.75;
        var batchSize = 5;
        grainValues.og = 0;
        grainValues.fg = 0;
        arr.forEach(function(item) {
            calcOG(arr, item.sg, item.amount, efficiency);
            grainValues.srm += parseFloat((((item.amount + item.lovibond) / (batchSize * 0.264))/10).toFixed(2));
        });
    }

    function calcOG(arr, sg, grainAmount, efficiency) {
        var batchSize = 5;
        self.grainInRecipe.filter(function(item) {
            item.og =  ((((parseFloat(sg) * grainAmount) * efficiency) / batchSize) / 1000);
        });
    }

    function editHopsInRecipe(hops, arr, hopsValues) {
        arr.push({
            name: hops.name,
            alphaAcid: (hops.alphaAcid / 100),
            amount: 1,
            boilTime: 10,
            description: hops.description
        });
        calcHopsTotals(arr, hopsValues);
    }

    function calcHopsTotals(arr, hopsValues) {
        hopsValues.ibu = 0;
        arr.forEach(function(item) {
            hopsValues.ibu += calcIBU(item);
        });
    }

    function editYeastInRecipe(yeast, arr, yeastValues, grainValues) {
        arr.push({
            name: yeast.name,
            attenuation: (yeast.minimumAttenuation + yeast.maximumAttenuation) / 2,
            description: yeast.description
        });
        calcYeastTotals(arr, yeastValues, grainValues);
    }


    function calcYeastTotals(arr, yeastValues, grainValues) {
        yeastValues.attenuation = 0;
        yeastValues.abv = 0;
        arr.forEach(function(item) {
            yeastValues.attenuation += calcAttenuation(grainValues.og, grainValues.fg);
            grainValues.fg += calcFG(grainValues.og, yeastValues.attenuation);
            yeastValues.abv = calcABV(grainValues.og, grainValues.fg);
        });
    }



    function calcFG(og, yeastAttenuation) {
        var fg = 1 + ((og * (1 - (yeastAttenuation))) / 1000);
        return fg;
    }

    function calcIBU(hops) {
        var batchSize = 5;
        var utilization = findHopUtilization(hops.boilTime);
        var ibu = parseFloat(((hops.alphaAcid * utilization * 74.89 / batchSize) * 100).toFixed(1));
        return ibu;
    }

    function calcAttenuation(og, fg) {
        var attenuation = ((og - fg) / og);
        return attenuation;
    }

    function calcABV(og, fg) {
        var abv = (og - fg) * 131.25;
        return abv;
    }

    function findHopUtilization (boilTime){
        var hopUtilization = 0;
        if(boilTime === 0) hopUtilization = 0;
        else if (boilTime > 0  && boilTime <= 9)  hopUtilization = 0.05;
        else if (boilTime > 9  && boilTime <= 19) hopUtilization = 0.12;
        else if (boilTime > 19 && boilTime <= 29) hopUtilization = 0.15;
        else if (boilTime > 29 && boilTime <= 44) hopUtilization = 0.19;
        else if (boilTime > 44 && boilTime <= 59) hopUtilization = 0.22;
        else if (boilTime > 59 && boilTime <= 74) hopUtilization = 0.24;
        else if (boilTime > 74) hopUtilization = 0.27;
        return hopUtilization;
    }

    this.saveRecipeToUser = function(recipe, user) {
        return $http({
            method: 'POST',
            url: 'api/users/newRecipe',
            data: {
                recipe: {
                    user: user,
                    name: recipe.name,
                    grain: this.grainInRecipe,
                    hops: this.hopsInRecipe,
                    yeast: this.yeastInRecipe,
                    batchSize: recipe.batchSize,
                    projectedEfficiency: recipe.efficiency,
                    isPrivate: recipe.isPrivate
                }
            }
        }).then(function(resp) {
            return (
                this.grainInRecipe = [],
                this.hopsInRecipe  = [],
                this.yeastInRecipe = [],
                this.grainValues   = { og: 0, fg: 0, srm: 0 },
                this.hopsValues    = { ibu: 0 },
                this.yeastValues   = { attenuation: 0, abv: 0 },
                resp.data
            );
        }.bind(this));
    };
});
