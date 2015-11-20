var mongoose = require('mongoose'),
    User     = mongoose.model('User', require('../models/userModel')),
    Recipe   = mongoose.model('Recipe', require('../models/recipeModel'));

module.exports = {

    newRecipe: function(req, res) {
        var recipeId;
        Recipe.create(req.body.recipe, function(err, newRecipe) {
            if(err) return res.status(500).json(err);
            recipeId = newRecipe._id;
        });
        User.findById(req.body.user, function(err, user) {
            user.recipes.push(recipeId);
            user.save(function(err) {
                return res.status(200).json('Recipe saved!');
            });
        });
    },

    getAllRecipes: function(req, res) {
        Recipe.find({})
        .where('isPrivate').equals(false)
        .exec(function(err, recipes) {
            if(err) return res.status(500).json(err);
            return res.status(200).json(recipes);
        });
    }
};
