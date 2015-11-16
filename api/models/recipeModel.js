var mongoose    = require( 'mongoose' ),
    User        = require( './userModel' );

var recipeSchema = {
    recipe: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
};

module.exports = new mongoose.Schema( recipeSchema );
