
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , workspace = require('./routes/workspace')
  , http = require('http')
  , path = require('path');

var app = express();

var nextFreeWorkspacePort = 8080;
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('baseUrl', 'http://82.196.2.177');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
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

//App

// API
app.get('/workspace', workspace.list);
app.post('/workspace', workspace.create);
app.get('/workspace/:name', workspace.run);
app.delete('/workspace/:name', workspace.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
