angular.module('GrainBilld')
.service('newBatchService', function() {
    var grainInRecipe  = [];
    var hopsInRecipe   = [];
    var yeastInRecipe  = [];


    this.addIngredient = function(ingredientType, ingredient) {
        switch(ingredientType) {
            case 'grain':
                addIngredientToRecipe(ingredient, addGrain);
                break;
            case 'hops':
                addIngredientToRecipe(ingredient, addHops);
                break;
            case 'yeast':
                addIngredientToRecipe(ingredient, addYeast);
                break;
        }
    };

    function addIngredientToRecipe(ingredient, cb) {
        cb(ingredient);
    }
    function addGrain(grain, amount, batchSize) {
        console.log('addGrain', grain);
        this.itemToAdd = 0;
        this.gpOfGrain = 0;
        this.OG = 1.000;
        amount = 0;
        grainInRecipe.push({grain: grain, amount: amount, batchSize: batchSize});
        if (!itemToAdd) {
            this.itemToAdd = ((grain.sg - 1)*1000 * amount);
            this.gpOfGrain = this.itemToAdd;
        } else {
            this.gpOfGrain = (this.itemToAdd + ((parseFloat(grain.sg) - 1)*1000) * amount);
            this.itemToAdd = this.gpOfGrain;
        }
        this.MCU = (parseFloat((grain.lovibond * amount)/batchSize));
        this.recipeSrm = (1.4922*(Math.pow(MCU, 0.6859))).toFixed(1);
        this.OG = ((gpOfGrain * 0.75 / batchSize)/1000 + 1).toFixed(3);
    } addGrain.bind(this);

    function addHops(hops, amount, boilTime) {
        console.log('addHops', hops);
        this.IBUOfGrain = 0;
        this.hopsItemToAdd = 0;
        this.hopsInRecipe.push({hops: hops, amount: amount, boilTime: boilTime});
        this.boilTime.push(boilTime);
        this.hopUtilization = 0;
        if(boilTime === 0) {
            this.hopUtilization = 0;
        } else if (boilTime > 0 && boilTime <= 9) {
            this.hopUtilization = 0.05;
        } else if (boilTime > 9 && boilTime <= 19) {
            this.hopUtilization = 0.12;
        } else if (boilTime > 19 && boilTime <= 29) {
            this.hopUtilization = 0.15;
        } else if (boilTime > 29 && boilTime <= 44) {
            this.hopUtilization = 0.19;
        } else if (boilTime > 44 && boilTime <= 59) {
            this.hopUtilization = 0.22;
        } else if (boilTime > 59 && boilTime <= 74) {
            this.hopUtilization = 0.24;
        } else if (boilTime > 74) {
            this.hopUtilization = 0.27;
        }
        this.AAU = amount * (hops.alphaAcid);
        if (!hopsItemToAdd) {
            this.IBUOfGrain = this.AAU * hopUtilization * 74.89 / this.batchSize;
            hopsItemToAdd = IBUOfGrain;
            this.IBU = IBUOfGrain.toFixed(1);
        }
        else {
            this.IBUOfGrain = (this.AAU * hopUtilization * 74.89 / this.batchSize) + hopsItemToAdd;
            hopsItemToAdd = IBUOfGrain;
            this.IBU = IBUOfGrain.toFixed(1);
        }
    } addHops.bind(this);

    function addYeast(yeast, amount) {
        console.log('addYeast', yeast);
        this.yeastInRecipe.push({yeast: yeast, amount: amount});
        thisattenuation = (this.yeastInRecipe.maximumAttenuation + this.yeastInRecipe.minimumAttenuation)/2;
        this.FG = (1+(this.OG / (attenuation))).toFixed(3);
        this.ABV = ((76.08) * (this.OG - this.FG) / (1.775 - this.OG) * (this.FG / 0.794)).toFixed(2);
    } addYeast.bind(this);

});
