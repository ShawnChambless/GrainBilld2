var mongoose = require('mongoose'),
    User     = mongoose.model('User', require('../models/userModel')),
    Recipe   = mongoose.model('Recipe', require('../models/recipeModel'));

module.exports = {

    newRecipe: function(req, res) {
        var recipeId;
        var recipeName;
        Recipe.create(req.body.recipe, function(err, newRecipe) {
            if(err) return res.status(500).json(err);
            recipeId = newRecipe._id;
            recipeName = newRecipe.name;
        });
        User.findById(req.body.recipe.user, function(err, user) {
            user.recipes.push(recipeId);
            user.save(function(err) {
                return res.status(200).json(recipeName + ' saved!');
            });
        });
    },

    getCommunityRecipes: function(req, res) {
        Recipe.find({})
        .where('isPrivate').equals(false)
        .exec(function(err, recipes) {
            if(err) return res.status(500).json(err);
            return res.status(200).json(recipes);
        });
    },

    getRecipeTotals: function(req, res) {
        Recipe.find({})
        .exec(function(err, resp) {
            if(err) return res.status(500).json(err);
            var totalCommunity = 0;
            resp.forEach(function(item) {
                if(!item.isPrivate) totalCommunity++;
            });
            return res.status(200).json({totalCount: resp.length, totalCommunity: totalCommunity});
        });
    },

    removeRecipe: function(req, res, next) {
        Recipe.findByIdAndRemove(req.body.recipeId, function(err, resp) {
            if(err) return res.status(500).json(err);
            console.log(resp);
            User.findByIdAndUpdate(resp.user, { $pull: { recipes: req.body.recipeId } }, {new: true}, function(err, resp) {
                if(err) return res.status(500).json(err);
                return res.status(200).json(resp);
            });
        });
    }
};
