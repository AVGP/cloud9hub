
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , workspace = require('./routes/workspace')
  , fs = require('fs')
  , path = require('path')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , GithubStrategy = require('passport-github').Strategy;


var app = express();

var nextFreeWorkspacePort = 5000;

// all environments
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('baseUrl', 'http://82.196.2.177');

//Auth
passport.use(new GithubStrategy({
    clientID: '3909fc1ee9f8ed9e87f2',
    clientSecret: 'e5b3802ef773d8d32a8b29fe958d04e591be850d',
    callbackURL: app.get('baseUrl') + ':' + app.get('port') + '/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    var username = path.basename(profile.username.toLowerCase());
    console.log(profile);
    if(!fs.existsSync(__dirname + '/workspaces/' + path.basename(username))) {
      if(!fs.mkdirSync(__dirname + '/workspaces/' + path.basename(username), '0700')) {
        console.log("Okay, shit");
        return done(err, null);
      } else {
        return done(null, username);
      }
    }
    return done(null, username);
  }
));

//Middlewares
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    console.log(req.path);
    if(/\/workspace\/.+/.test(req.path)) {
        req.nextFreePort = (nextFreeWorkspacePort++);
    }
    next();
});
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Auth requests
app.get('/auth/github', passport.authenticate('github'), function(req, res) {});
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/#/dashboard');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.json('OK');
});
// API
app.get('/workspace', ensureAuthenticated, workspace.list);
app.post('/workspace', ensureAuthenticated, workspace.create);
app.get('/workspace/:name', ensureAuthenticated, workspace.run);
app.delete('/workspace/:name', ensureAuthenticated, workspace.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Helpers

passport.serializeUser(function(user, done) {
  console.log("SERIALIZE");
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(401);
  res.json({msg: "Please login first!"});
}
