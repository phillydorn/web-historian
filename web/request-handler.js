var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require('http-request');
var headerFile = require('./http-helpers.js');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET' ){
    if(req.url === '/'){
      var statusCode = 200;
     headerFile.serveAssets(res,'/index.html');  
    }else {
      var file = fs.createReadStream(archive.paths.archivedSites + req.url)
      file.on('error',function(){
        var statusCode = 404;
        res.writeHead(statusCode,headerFile.headers);
        res.end();
      });
      file.pipe(res);
    }
    
  }

  // res.end(archive.paths.list);
};
