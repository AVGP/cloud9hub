var WorkspaceCtrl = function($scope, $http, $timeout) {
  $scope.workspaces = [];
  $scope.currentWorkspace = {name: null, url: '/welcome.html'};

  $http.get('/workspace')
  .success(function(data) { console.log(data); $scope.workspaces = data.workspaces; })
  .error(function(err) { alert(err.msg) });

  $scope.createWorkspace = function() {
    var wsName = window.prompt("Enter workspace name", "");
    $http.post('/workspace/create', {name: wsName})
    .success(function(data) {
      alert("Success: " + data.msg);
      $scope.workspaces.push({name: wsName});
    })
    .error(function(err) {
      alert("Error: " + err.msg);
    });
  }

  $scope.runWorkspace = function(name) {
    console.log(name);
    $http.get('/workspace/' + name).success(function(data) {
      console.log(data);
      $timeout(function() {
        $scope.currentWorkspace.url = data.url;
      }, 2000);
    }).error(function(err) {
      alert("Error: " + err);
      console.log(err);
    });
    $scope.currentWorkspace.name = name;
  }
}