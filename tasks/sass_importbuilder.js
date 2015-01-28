/*
 * grunt-sass-importbuilder
 * https://github.com/ChaosDeSelva/grunt-sass-importbuilder
 *
 * Copyright (c) 2015 ChaosDeSelva
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    slash = require('slash');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sass_importbuilder', 'Builds an import file for all the partials found.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      styleLog: [],
      ignoreSrc: []
    });

    var partials = '';
      
    function compute (from, to) {
      return (slash(path.relative(path.dirname(from), to)) || '.') + '/';
    }

    function relativizeCSS (source, relativeRoot) {
      return source.replace(/(url\(['"]?)\/(?!\/)/g, "$1"+relativeRoot);
    }
    
    grunt.log.writeln('Searching for partials...');
      
    // Iterate over all specified file groups.
    this.files.forEach(function(f) { 
      // Concat specified files.
      var src = f.src.filter(function(filepath) {     
        filepath = f.cwd+filepath;
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });
      
      src.map(function(filepath) {
          filepath = f.cwd+filepath;
          if ( grunt.file.isFile(filepath) && ( options.ignoreSrc.length === 0 || filepath.indexOf(options.ignoreSrc) === -1 ) ) {
              var output = grunt.file.read(filepath).replace(/(\r\n|\n|\r)/gm," ").replace(/ /g,'');
              var filename = filepath.replace(/^.*[\\\/]/, '');
              var ext = filename.split('.').pop(); 
              var hasUnderscore = filename.indexOf('_'); 
              var destPath =  f.cwd+f.dest.replace(/[^\/]*$/, '');
              
              if ( hasUnderscore === 0 && ext === 'scss' && filename !== f.dest.replace(/^.*[\\\/]/, '') ){
                  grunt.log.ok('Partial Found at'+ filepath); 
                  var arr = filename.split('.');
                  arr.pop();
                  var newFilename = arr.join().substr(1);
                  var urlstr = filepath.replace(/[^\/]*$/, '');
                  var relativeRoot = compute(destPath, urlstr);
                  var finalPath;

                  if ( urlstr.indexOf(destPath) !== -1 ){
                    finalPath = urlstr.replace(destPath,'');
                  } else {
                    finalPath = '../'+relativeRoot;   
                  }
            
                  partials += '@import "'+finalPath+newFilename+'"; \n';
              }              
              
              if ( options.styleLog.length > 0 && options.styleLog.indexOf(ext) !== -1 && output.indexOf('style=') !== -1 ){
                grunt.log.warn('Inline Style Detected in '+ filepath);   
              } 
              
              if ( options.styleLog.length > 0 && options.styleLog.indexOf(ext) !== -1 && output.indexOf('<style') !== -1 ){
                grunt.log.warn('Embedded Style Detected in '+ filepath);   
              }
          }
      });

      grunt.file.write(f.cwd+f.dest, partials);
      grunt.log.ok('File Created at ' + f.dest);
    });
  });
};