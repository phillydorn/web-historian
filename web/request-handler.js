var path = require('path');
var archive = require('../helpers/archive-helpers');
var request = require('http-request');
var headerFile = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET' ){
    var statusCode = 200;
    headerFile.serveAssets(res,'/index.html');
  }

  // res.end(archive.paths.list);
};
