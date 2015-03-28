var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
// var urls = [];


exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, function (err, data) {
    if (!err) {
      var urls = (''+data).split('\n');
      if (callback) { 
        callback(urls);
      }
    }
  });
};

exports.isUrlInList = function(url, callback){
  this.readListOfUrls(function(urls){
    var result = false;
    for (var i = 0; i < urls.length; i++) {
      if (urls[i] === url) {
        result = true;
      }
  }
  callback(result);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile (this.paths.list, url+'\n', function (err) {
    if (!err) {
      callback();
    }
  })
};

exports.isUrlArchived = function(){
 }

exports.downloadUrls = function(){
};
