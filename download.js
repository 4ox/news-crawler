//require
var url = require("./url")
, dateStr = new Date().format("YmdHis")
, fileName = ""
, downPath = "./download/";


var down = { 
    start : function() {
        for( idx in url ) {
            fileName = dateStr + "_" + url[idx].name + ".html";
            path = url[idx].path;
            down.req( path, fileName );
        }
    },
    req : function( url, fileName ) {
        console.log( url );
        console.log( fileName );
    }
}


down.start();

