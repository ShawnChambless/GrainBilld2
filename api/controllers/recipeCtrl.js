var mongoose = require('mongoose'),
    User     = mongoose.model('User', require('../models/userModel')),
    Recipe   = mongoose.model('Recipe', require('../models/recipeModel'));

module.exports = {

    newRecipe: function(req, res) {
        User.findById(req.body.user, function(err, user) {
            if(err) return res.status(500).json(err);
            user.recipes.push(req.body.newRecipe);
            user.save(function(err, updatedUser) {
                Recipe.create({recipe: {user: req.body.user, recipe: updatedUser._id}});
                if(err) return res.status(500).json(err);
                return res.status(200).json(updatedUser);
            });
        });
    },

    getAllRecipes: function(req, res) {
        Recipe.find({})
        .populate('user recipe')
        .exec(function(err, recipes) {
            if(err) return res.status(500).json(err);
            return res.status(200).json(recipes);
        });

    }
};
