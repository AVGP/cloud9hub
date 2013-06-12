angular.module('c9hub', ['workspace']).config(function($routeProvider) {
    $routeProvider.when('/', {templateUrl: "/partials/login.html"});
    $routeProvider.when('/dashboard', {controller: WorkspaceCtrl, templateUrl: "/partials/workspace.html"});
});