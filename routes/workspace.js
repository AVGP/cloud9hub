'use strict';

var workspaces = require('../controllers/workspaces');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {
    app.get('/workspace', authorization.requiresLogin, workspaces.list);
    app.post('/workspace', authorization.requiresLogin, workspaces.create);
    app.get('/workspace/:name', authorization.requiresLogin, workspaces.run);
    app.post('/workspace/:name/keepalive', authorization.requiresLogin, workspaces.keepAlive);
    app.delete('/workspace/:name', authorization.requiresLogin, workspaces.destroy);
}
