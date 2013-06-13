var WorkspaceCtrl = function($scope, $http, $timeout) {
  $scope.workspaces = [];
  $scope.currentWorkspace = {name: null, url: '/welcome.html'};

  $http.get('/workspace')
  .success(function(data) { console.log(data); $scope.workspaces = data.workspaces; })
  .error(function(err) { alert(err.msg) });

  var _sendKeepAlive = function() {
    $http.post('/workspace/' + $scope.currentWorkspace.name + '/keepalive').success(function() {
      $timeout(_sendKeepAlive, 300000);
    });
  };

  $scope.createWorkspace = function() {
    var wsName = window.prompt("Enter workspace name", "");
    $http.post('/workspace/', {name: wsName})
    .success(function(data) {
      alert(data.msg);
      $scope.workspaces.push({name: wsName});
    })
    .error(function(err) {
      alert("Error: " + err.msg);
    });
  }

  $scope.deleteWorkspace = function(name) {
    if(!window.confirm("Do you really want to delete this workspace? All your files in that workspace will be gone forever!")) return;
    $http.delete('/workspace/' + name)
    .success(function(data){
      console.log(data);
      alert(data.msg);
      for(var i=0;i<$scope.workspaces.length;i++) {
        if($scope.workspaces[i].name === name) {
          $scope.workspaces.splice(i,1);
          break;
        }
      }
    })
    .error(function(err) {
      console.log("ERR:", err);
    });
  }

  $scope.runWorkspace = function(name) {
    console.log(name);
    $http.get('/workspace/' + name).success(function(data) {
      console.log(data);
      $timeout(function() {
        $scope.currentWorkspace.url = data.url;
        _sendKeepAlive();
      }, 2000);

    }).error(function(err) {
      alert("Error: " + err);
      console.log(err);
    });
    $scope.currentWorkspace.name = name;
  }
}