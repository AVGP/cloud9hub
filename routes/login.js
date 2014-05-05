'use strict';

var login = require('../controllers/login');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {
    app.get('/login', login.login);
}