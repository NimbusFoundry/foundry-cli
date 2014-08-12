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

  // copy the source file to the folder
  function move_source(destination){

    var source = scriptPath + '/../source/Foundry.zip',
        data = fs.ReadStream(source);

    // copy to current location
    var dest = cwd+destination;

    // reading archives
    var zip = new AdmZip(source);

    zip.extractAllTo(/*target path*/dest, /*overwrite*/true);

    // ncp(dest+'/Foundry', dest, function (err) {
    //   if (err) {
    //     return console.error(err);
    //   }

    //   // rimraf(dest+'/Foundry', function(){
    //   //   // console.log('delete Foundry');
    //   // });

    //   // rimraf(dest+'/__MACOSX', function(){
    //   //   // console.log('delete __MACOSX');
    //   // });
    // });
  }

  // set the key and secret

  // test with input
  var command = ['create', 'config'];

  // create_dir(cwd+'/destination', function(){
  //   move_source('/destination/');
  // });

  function main(){
    var commandIncrement = 1;

    // determin this is run 
    if (process.argv.length > 1+commandIncrement) {
      switch(process.argv[1+commandIncrement]){
        case 'create' :
          var name = '/Foundry'
          if (process.argv[2+commandIncrement]) {
            name = '/'+process.argv[2+commandIncrement];
          };  

          move_source(name);
          console.log('Project is created.');
        default :
          console.log('NimbusBase Foundry');
      }
    };
  }

  exports.foundry = main;

})();

