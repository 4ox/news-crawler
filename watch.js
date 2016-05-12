//require
var fs = require("fs")
, fsPath = require("fs-path")
, util = require("./util")
, chokidar = require('chokidar')
, date = new Date();

// Initialize watcher. 
var watcher = chokidar.watch('file, dir', {
    ignored: /[\/\\]\./,
    persistent: true
});

// Something to use when events are received. 
var log = console.log.bind(console);

var path = __dirname + "/download/";
console.log( "Watching : " + path );

// One-liner
require('chokidar').watch( path, {ignored: /[\/\\]\./}).on('all', function(event, path) {
    if( event == "add") {
        //var file = fs.createReadStream(path, {flags: 'r'} );
        //var out = fs.createWriteStream('./data/results2.txt', {flags: 'w'});
        //file.pipe(out);
        var moveFolder = path.replace("/download/","/watch/");
        log(event, path);
    }
});
