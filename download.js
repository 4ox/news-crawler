//require
var fs = require("fs")
, fsPath = require("fs-path")
, request = require("request")
, util = require("./util")
, date = new Date();

//download url
var urls = [
    { name : "main_news", path : "http://m.naver.com/include/grid/panel_NEWS.shtml?menu=NEWS" },
    { name : "main_ent", path : "http://m.naver.com/include/grid/panel_ENT.shtml?menu=ENT" },
    { name : "main_spo", path : "http://m.naver.com/include/grid/panel_SPORTS.shtml?menu=SPORTS" },
    { name : "home", path : "http://m.news.naver.com/home.nhn" }
];

//down
var download = { 
    path : [ __dirname, "download", date.format("Y/m/d/") ].join("/"),
    req : function() {
        //mkdir
        fsPath.mkdir(download.path, function(err){
            if(err) throw err;
            //file request and save
            var fileName = "";
            for( idx in urls ) {
                fileName = date.format("His") + "_" + urls[idx].name + ".html";
                //requset and save file
                console.log( "Request : " + urls[idx].path );
                console.log( "> Save  : " + download.path + fileName );
                request( urls[idx].path ).pipe(fs.createWriteStream( download.path + fileName, {flags: 'w'} ))
            }
        });
    }
}

download.req();

