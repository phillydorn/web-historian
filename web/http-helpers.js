var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  var file = archive.paths.siteAssets + asset;
  var readfile = fs.createReadStream(file);
  readfile.pipe(res);
};

exports.serveArchives = function(res,asset){
  var file = archive.paths.archivedSites + '/' + asset;
  var readfile = fs.createReadStream(file);
  readfile.pipe(res);
}


// As you progress, keep thinking about what helper functions you can put here!

exports.servePage = function(res, url) {
  // check if page exists as a file in sites
  archive.isUrlArchived(url, function(exists) {
    if (!exists) {
    //send loading page
      var statusCode = 302;
      res.writeHead(statusCode, exports.headers);
      exports.serveAssets(res, '/loading.html');
    //start downloading the site
    }
    
  //send to site
    
  })
}