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
  console.log('serving assets')
  var file = archive.paths.siteAssets + asset;
  var readfile = fs.createReadStream(file);
  readfile.pipe(res);
};

exports.serveArchives = function(res,asset){
  console.log()
  var file = archive.paths.archivedSites + '/' + asset;
  console.log('file is ', file)
  var archiveFile = fs.createReadStream(file);
  archiveFile.pipe(res);
}


// As you progress, keep thinking about what helper functions you can put here!

exports.servePage = function(res, url) {
  exports.serveArchives(res, url);

  
  // check if page exists as a file in sites
  // archive.isUrlArchived(url, function(exists) {
  //   console.log('exists' , exists)
  //   if (!exists) {
  //     var statusCode = 302;
  //     res.writeHead(statusCode, exports.headers);
  //     headerFile.serveAssets(res, '/loading.html');
  //     console.log('done serving')
  //     var urls = [url];
  //     archive.downloadUrls(urls);
  //   } else {
    
  //   res.writeHead(302, exports.headers);

  //   }
    
  // })
}