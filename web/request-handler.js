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
    
  }else if(req.method === 'POST'){
    
    var dataString='';
    req.on('data',function(chunk){
      dataString+= chunk;
    });

    req.on('end', function() {
      if(dataString.indexOf('url=') === 0) {
        dataString = dataString.slice(4);
      } else {
        dataString = JSON.parse(dataString).url;        
      }

      fs.readFile(archive.paths.list,{'encoding':'utf8'},function(error,data){
        var sites;
        if(!error){
          sites = data;
        }else{
          sites = '';
        }
        sites += dataString + '\n';
        headerFile.servePage(res, dataString); 
        fs.writeFile(archive.paths.list,sites,function(){
          // res.writeHead(302, headerFile.headers)
          // res.end();
        });
      });
    })
  }
};
