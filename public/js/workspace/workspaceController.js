var WorkspaceCtrl = function($scope, $http, $timeout) {
  $scope.workspaces = [];
  $scope.currentWorkspace = false; // {name: null, url: null, editing: false};
  $scope.loadingWorkspace = false;

  $http.get('/workspace')
  .success(function(data) { console.log(data); $scope.workspaces = data.workspaces; })
  .error(function(err) { alert(err.msg) });

  var _sendKeepAlive = function() {
    $http.post('/workspace/' + $scope.currentWorkspace.name + '/keepalive').success(function() {
      $timeout(_sendKeepAlive, 300000);
    });
  };
  
  $scope.startEditing = function() {
    $scope.currentWorkspace.editing = true;  
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
    $scope.loadingWorkspace = true;
    $http.get('/workspace/' + name).success(function(data) {
      $timeout(function() {
        $scope.currentWorkspace = {};
        $scope.currentWorkspace.name = name;
        $scope.currentWorkspace.url = data.url;
        $scope.currentWorkspace.editing = false;
        _sendKeepAlive();
        $scope.loadingWorkspace = false;
      }, 2000);

    }).error(function(err) {
        $scope.loadingWorkspace = false;
        alert("Error: " + err);
        console.log(err);
    });
  }
}