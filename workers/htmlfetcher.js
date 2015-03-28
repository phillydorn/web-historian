var archive = require ('../helpers/archive-helpers.js');
var headerFile = require('../web/http-helpers.js');
var static = require('node-static');
var fs = require('fs')
var _ = require('underscore')

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

exports.downloadFiles = function() {
  fs.readFile(archive.paths.list, function (err, data) {
    if (!err) {
      var urls = (''+data).split('\n');
      var toBeDownloaded = [];
      _.each(urls, function (url) {
        archive.isUrlArchived(url, function (exists) {
          if (!exists) {
            archive.downloadUrls([url]);
          }
        })   
      })

    }
  });
}

