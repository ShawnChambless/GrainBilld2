var mongoose = require('mongoose'),
    User     = mongoose.model('User', require('../models/userModel')),
    Recipe   = mongoose.model('Recipe', require('../models/recipeModel'));

module.exports = {

    newRecipe: function(req, res) {
      User.findById(req.body.user, function(err, user) {
          if(err) return res.status(500).json(err);
          user.recipes.push(req.body.newRecipe);
          user.save(function(err, updatedUser) {
              if(err) return res.status(500).json(err);
              return res.status(200).json(updatedUser);
          });
      });
    }

};
