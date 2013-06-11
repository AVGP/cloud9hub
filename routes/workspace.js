var fs = require('fs'),
    path = require('path'),
    spawn = require('child_process').spawn;

var createWorkspace = function(params, res) {
    var potentiallyBadPathName = params.name.split(path.sep);
    var workspaceName = potentiallyBadPathName[potentiallyBadPathName.length-1];
    
    if(workspaceName === '..') {
        res.status(400);
        res.send("Fuck you.");
        return;
    }
    
    fs.mkdir(__dirname + '/../workspaces/' + workspaceName, '0700', function(err) {
      if(err) {
          res.status(400);
          res.json(err);
          return;
      }
      
      res.redirect('/workspace/')
    });    
}

/*
 * POST/GET create a new workspace
 */
exports.create = function(req, res) {
    if(req.body.name) {
        createWorkspace(req.body, res);
    } else {
        res.render('workspace/create');
    }
}

/*
 * GET workspaces listing.
 */
exports.list = function(req, res){
    fs.readdir(__dirname + '/../workspaces/', function(err, files) {
        if(err) {
            res.status(500);
            res.send(err);
        } else {
            res.render('workspace/list', {workspaces: files});
        }
    });    
};

/*
 * GET run a workspace
 */
 exports.run = function(req, res) {
     console.log("Starting " + __dirname + '/../../c9/bin/cloud9.sh');
     
    var potentiallyBadPathName = req.params.name.split(path.sep);
    var workspaceName = potentiallyBadPathName[potentiallyBadPathName.length-1];
    
    if(workspaceName === '..') {
        res.status(400);
        res.send("Fuck you.");
        return;
    }
    
     var workspace = spawn(__dirname + '/../../c9/bin/cloud9.sh', ['-w', __dirname + '/../workspaces/' + workspaceName, '-l', '0.0.0.0', '-p', '8090'], {detached: true});
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
     
     res.json(req.params.name);
 }