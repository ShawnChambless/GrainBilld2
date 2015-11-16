var mongoose    = require( 'mongoose' ),
    Recipe      = require('./recipeModel');

var userSchema = {
  firstName:  { type: String, required: true },
  lastName:   { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  recipes:    [ {
      name:                { type: String },
      grain:               { type: Object },
      hops:                { type: Object },
      yeast:               { type: Object },
      batchSize:           { type: Number },
      projectedEfficiency: { type: Number },
      actualEfficiency:    { type: Number },
      isPrivate:           { type: Boolean, default: true }
   } ],
  favorites:  [ { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' } ]
};

module.exports = new mongoose.Schema( userSchema );
