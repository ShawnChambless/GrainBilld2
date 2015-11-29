var express     = require( 'express' ),
    session     = require( 'express-session' ),
    bodyParser  = require( 'body-parser' ),
    cors        = require( 'cors' ),
    mongoose    = require( 'mongoose' ),
    passport    = require( './api/passport/config' ),
    compression = require( 'compression' ),
    userCtrl    = require( './api/controllers/userCtrl' ),
    recipeCtrl  = require( './api/controllers/recipeCtrl' ),
    grainCtrl   = require( './api/controllers/grainCtrl' ),
    hopsCtrl    = require( './api/controllers/hopsCtrl' ),
    yeastCtrl   = require( './api/controllers/yeastCtrl' ),
    favicon     = require( 'serve-favicon' ),
    http        = require( 'http' ),
    serve       = require( 'serve-favicon' ),
    port        = 8080,
    app         = express(),
    httpServer  = http.createServer(app);

app.use(compression());
app.use(favicon('favicon.ico'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'JESUS-MakEs-really-good-beer',
    resave: 'false',
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.post('/auth/local/signup', passport.authenticate( 'local-signup' ), function(req, res){
      res.json(req.user);
});
app.post('/auth/local/login', passport.authenticate( 'local-login' ), function(req, res){
    res.json(req.user);
});
app.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
//User endpoints

app.post(   '/api/users',                       userCtrl.create );
app.get(    '/api/users/getUser',               userCtrl.getCurrentUser);
app.get(    '/api/user/recipes/:userId',        userCtrl.getRecipes);
app.put(    '/api/user/recipes/remove', recipeCtrl.removeRecipe);
app.put(    '/api/users/:user_id',              userCtrl.update );
app.post(   '/api/users/newRecipe',             recipeCtrl.newRecipe);
app.delete( '/api/users/:user_id',              userCtrl.remove );

//Recipe Endpoints

app.get(    '/api/recipes/community',    recipeCtrl.getCommunityRecipes);
app.get(    '/api/recipes',              recipeCtrl.getRecipeTotals);

//Database endpoints

    app.get(    '/api/database/ingredients/grain',      grainCtrl.getGrain);
    app.post(   '/api/database/ingredients/grain',      grainCtrl.addGrain);
    app.put(    '/api/database/ingredients/grain/:_id/', grainCtrl.updateGrain);
    app.get(    '/api/database/ingredients/hops',       hopsCtrl.getHops);
    app.post(   '/api/database/ingredients/hops',       hopsCtrl.addHops);
    app.get(    '/api/database/ingredients/yeast',      yeastCtrl.getYeast);
    app.post(   '/api/database/ingredients/yeast',      yeastCtrl.addYeast);
mongoose
    .set('debug', true)
    .connect('mongodb://localhost:27017/grainbilld', function() {
    console.log('Mongo is also Listening');
});
httpServer.listen(port, function() {
    console.log('Listening with httpServer on:', port);
});
