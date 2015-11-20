var mongoose    = require( 'mongoose' ),
    User        = require( './userModel' );

var recipeSchema = {
    user:                { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name:                { type: String },
    grain:               { type: Object },
    hops:                { type: Object },
    yeast:               { type: Object },
    batchSize:           { type: Number },
    projectedEfficiency: { type: Number },
    actualEfficiency:    { type: Number },
    isPrivate:           { type: Boolean, default: true }
};

module.exports = new mongoose.Schema( recipeSchema );
