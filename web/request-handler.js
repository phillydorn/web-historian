var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require('http-request');
var headerFile = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET' ){
    if(req.url === '/'){
      var statusCode = 200;
     headerFile.serveAssets(res,'/index.html');  
    }else{
      var statusCode = 200;
      headerFile.serveArchives(res,req.url);
    }
    
  }

  // res.end(archive.paths.list);
};
