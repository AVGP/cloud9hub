angular.module('c9hub', ['workspace']).config(function($routeProvider) {
    $routeProvider.when('/', {controller: WorkspaceCtrl, templateUrl: "/partials/workspace.html"});
});