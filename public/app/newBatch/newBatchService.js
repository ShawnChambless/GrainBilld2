angular.module('GrainBilld')
.service('newBatchService', function() {
    var recipeStats   = [{og: 0}, {ibu: 0}, {abv: 0}];
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
        return OG(), SRM();
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

    var addHopsToRecipe = function(hops, amount, batchSize, boilTime, calculateIBUOfRecipe, findHopUtilization) {
        this.hopsInRecipe.push({hops: hops, amount: amount, boilTime: boilTime});
        var util = findHopUtilization(boilTime);
        var IBU = calculateIBUOfRecipe(hops, amount, batchSize, util);
        return IBU(), util();
    }.bind(this);

    var findHopUtilization = function(boilTime) {
        boilTime = 10;
        var hopUtilization = 0;
        return function() {
            if(boilTime === 0) {
                hopUtilization = 0;
            } else if (boilTime > 0 && boilTime <= 9) {
                hopUtilization = 0.05;
            } else if (boilTime > 9 && boilTime <= 19) {
                hopUtilization = 0.12;
            } else if (boilTime > 19 && boilTime <= 29) {
                hopUtilization = 0.15;
            } else if (boilTime > 29 && boilTime <= 44) {
                hopUtilization = 0.19;
            } else if (boilTime > 44 && boilTime <= 59) {
                hopUtilization = 0.22;
            } else if (boilTime > 59 && boilTime <= 74) {
                hopUtilization = 0.24;
            } else if (boilTime > 74) {
                hopUtilization = 0.27;
            }
            return hopUtilization;
        };

    };

    var calculateIBUOfRecipe = function(hops, amount, batchSize, utilization) {
        var hopUtilization = utilization(),
        IBUOfHops     = 0,
        hopsItemToAdd = 0;
        AAU           = amount * (hops.alphaAcid);
        return function() {
            if (!hopsItemToAdd) {
                IBUOfHops = AAU * hopUtilization * 74.89 / batchSize;
                hopsItemToAdd = IBUOfHops;
                IBU = IBUOfHops.toFixed(1);
            } else {
                IBUOfHops = (AAU * hopUtilization * 74.89 / batchSize) + hopsItemToAdd;
                hopsItemToAdd = IBUOfHops;
                IBU = IBUOfHops.toFixed(1);
            }
            recipeStats.find(function(ele) { ele.ibu += parseFloat(IBU); });
            return IBU;
        };

    };

    var addYeastToRecipe = function(yeast) {
        this.yeastInRecipe.push({yeast: yeast});
        var attenuation = 0;
        attenuation = ((yeast.maximumAttenuation + yeast.minimumAttenuation)/2);
        var OG = recipeStats[0].og;
        var FG = (1+(OG / (attenuation))).toFixed(3);
        var ABV = ((76.08) * (OG - FG) / (1.775 - OG) * (FG / 0.794)).toFixed(2);
        return parseFloat(FG), parseFloat(ABV);
    }.bind(this);

    function addIngredient(ingredientType, ingredient) {
        switch(ingredientType) {
            case 'grain':
                addGrainToRecipe(ingredient, calculateOGOfRecipe, calculateSRMOfRecipe);
                break;
            case 'hops':
                amount = 10;
                batchSize = 10;
                boilTime = 10;
                addHopsToRecipe(ingredient, amount, batchSize, boilTime, calculateIBUOfRecipe, findHopUtilization);
                break;
            case 'yeast':
                addYeastToRecipe(ingredient);
                break;
        }
    }

});
