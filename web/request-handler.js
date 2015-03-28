var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require('http-request');
var headerFile = require('./http-helpers.js');
var url = require('url');
var fs = require('fs');
var static = require('node-static');
var publicStatic = new static.Server(archive.paths.siteAssets);
var htmlFetcher = require ('../workers/htmlFetcher.js')
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET' ){
    if(req.url === '/'){
      var statusCode = 200;
      headerFile.serveAssets(res,'/index.html'); 
      // publicStatic.serve(req,res); 
    } else if (req.url === '/styles.css') {
      // publicStatic.serve(req, res)
      var statusCode = 200;
      headerFile.serveAssets(res,'/styles.css'); 
   
    }
    else {
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
        console.log('dataString', dataString)
      
        archive.isUrlInList(dataString, function (found) {
          if (found) {//if in text file
          // check archives - if in archives
            archive.isUrlArchived(dataString, function (exists) {
              if (exists) {
              //display page
                headerFile.servePage(res, dataString)
              } else {
              //if not in archives display loading
                headerFile.serveAssets(res, '/loading.html');
              }
            })
          } else { //if not in text 
            //append to text
            archive.addUrlToList(dataString, function() {
              //no op?
          })
          //display loading
          headerFile.serveAssets(res, '/loading.html');
          }
        })
      });
    });
  };
};
