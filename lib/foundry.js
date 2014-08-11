(function(){

  'use strict'

  var fs = require('fs'),
      path = require('path'),
      http = require('http'),
      zlib = require('zlib'),
      rimraf = require('rimraf'),
      scriptPath = path.dirname(fs.realpathSync(__filename)),
      cwd = process.cwd();

  var AdmZip = require('adm-zip');

  var ncp = require('ncp').ncp;

  // create the directory for project
  // cd into the folder and the copy the source 
  // and unzip the compressed file
  var create_dir = function(path, callback){
    // read the path

    fs.mkdir(path, function(r, s){
      console.log(r, s);

      if(callback){
        callback(r, s);
      }
    });
  }


  // copy the source file to the folder
  function move_source(destination){

    var source = scriptPath + '/../source/Foundry.zip',
        data = fs.ReadStream(source);

    // copy to current location
    var dest = cwd;

    console.log('src: ',source);

    // reading archives
    var zip = new AdmZip(source);

    zip.extractAllTo(/*target path*/dest, /*overwrite*/true);

    ncp(dest+'/Foundry', dest, function (err) {
      if (err) {
        return console.error(err);
      }

      rimraf(dest+'/Foundry', function(){
        console.log('delete Foundry');
      });

      rimraf(dest+'/__MACOSX', function(){
        console.log('delete __MACOSX');
      });

      console.log('done!');
    });
  }

  // set the key and secret

  // test with input
  var command = ['create', 'config'];

  // create_dir(cwd+'/destination', function(){
  //   move_source('/destination/');
  // });

  function main(){
    move_source('/destination/');
  }

  exports.foundry = main;

})();

