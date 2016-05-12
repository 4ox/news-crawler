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
var down = { 
    path : [ __dirname, "download", date.format("Y/m/d/") ].join("/"),
    start : function() {
        //mkdir
        fsPath.mkdir(down.path, function(err){
            if(err) throw err;
            //file request and save
            var fileName = "";
            for( idx in urls ) {
                fileName = date.format("His") + "_" + urls[idx].name + ".html";
                //requset and save file
                request( urls[idx].path ).pipe(fs.createWriteStream( down.path + fileName, {flags: 'w'} ));
            }
        });
    }
}

down.start();

