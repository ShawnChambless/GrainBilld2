var express     = require( 'express' ),
    bodyParser  = require( 'body-parser' ),
    cors        = require( 'cors' ),
    mongoose    = require( 'mongoose' ),
    passport    = require( 'passport' ),
    local       = require( 'passport-local' ).Strategy,
    compression = require( 'compression' ),
    http        = require( 'http' ),
    serve       = require( 'serve-favicon' ),
    port        = 1337,
    app         = express(),
    httpServer  = http.createServer(app);

app.use(favicon(__dirname + './public/favicon.ico'));
app.use(express.static(__dirname +'./public'));
app.use(compression());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/brewabatch', function(err, response) {
    console.log(err, 'Mongo is also Listening', response);
});
httpServer.listen(port, function() {
    console.log('Listening with httpServer on', port);
});
