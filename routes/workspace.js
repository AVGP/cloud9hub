var fs = require('fs'),
  path = require('path'),
  spawn = require('child_process').spawn;

var respondInvalidWorkspace = function(res) {
  res.status(400);
  res.json({msg: "Invalid workspace name"});  
};

var createWorkspace = function(params, res) {
  var potentiallyBadPathName = params.name.split(path.sep);
  var workspaceName = potentiallyBadPathName[potentiallyBadPathName.length-1];
  
  if(workspaceName === '..') {
    respondInvalidWorkspace(res);
    return;
  }
  
  fs.mkdir(__dirname + '/../workspaces/' + workspaceName, '0700', function(err) {
    if(err) {
      respondInvalidWorkspace(res);
      return;
    }
  
    res.json({msg: "Workspace " + workspaceName + " was created."});
  });  
}

/*
 * POST/GET create a new workspace
 */
exports.create = function(req, res) {
  if(req.body.name) {
    createWorkspace(req.body, res);
  } else {
    respondInvalidWorkspace(res);
  }
}

/*
 * GET workspaces listing.
 */
exports.list = function(req, res){
  fs.readdir(__dirname + '/../workspaces/', function(err, files) {
    if(err) {
      res.status(500);
      res.json({error: err});
    } else {
      var workspaces = [];
      for(var i=0; i< files.length; i++) {
          // Skip hidden files
          if(files[i][0] === '.') continue;
          
          workspaces.push({name: files[i]})
      }
      res.json({workspaces: workspaces});
    }
  });  
};

/*
 * GET run a workspace
 */
 exports.run = function(req, res) {   
  var potentiallyBadPathName = req.params.name.split(path.sep);
  var workspaceName = potentiallyBadPathName[potentiallyBadPathName.length-1];
  
  if(workspaceName === '..') {
    respondInvalidWorkspace(res);
    return;
  }
  
   console.log("Starting " + __dirname + '/../../c9/bin/cloud9.sh for workspace ' + workspaceName + " on port " + req.nextFreePort);  
  
   var workspace = spawn(__dirname + '/../../c9/bin/cloud9.sh', ['-w', __dirname + '/../workspaces/' + workspaceName, '-l', '0.0.0.0', '-p', req.nextFreePort], {detached: true});
   workspace.stdout.on('data', function (data) {
     console.log('stdout: ' + data);
   });
   workspace.stderr.on('data', function (data) {
     console.log('stdERR: ' + data);
   });
   
   setTimeout(function() {
     process.kill(-workspace.pid, 'SIGTERM');
     console.log("Killed workspace " + workspaceName);
   }, 900000); //Workspaces have a lifetime of 15 minutes
   
   res.json({msg: "Successfully started workspace", url: req.app.settings.baseUrl + ":" + req.nextFreePort});
 }