//require
var fs = require("fs")
, fsPath = require("fs-path")
, request = require("request")
, date = new Date();

// Name : Date.prototype.Format
// Date : 2013-06-10
// Type : Instance Method
// Modified by : woong
// Comment : Date 문자열 처리 ( 포멧 형식화 )
Date.prototype.format = function( str ){
    var date = this;
    return str.replace(/(Y|y|n|m|d|j|a|A|g|G|h|H|i|s|DD|ll|D|l)/g, function( word ){
        switch( word ){
            case "Y": return date.getFullYear(); break;
            case "y": return String(date.getFullYear()).substring(2,4); break;
            case "n": return Number(date.getMonth())+1; break;
            case "m": return (date.getMonth() < 9 ? "0" : "" )+(date.getMonth()+1); break;
            case "d": return (date.getDate() < 10 ? "0" : "" )+date.getDate(); break;
            case "j": return date.getDate(); break;
            case "a": return (date.getHours() < 12 ? "am":"pm"); break;
            case "A": return (date.getHours() < 12 ? "오전":"오후"); break;
            case "g": return (date.getHours() < 12 ? date.getHours() : Number(date.getHours())-12); break;
            case "G": return date.getHours(); break;
            case "h": var tmp = (date.getHours() < 12 ? date.getHours() : Number(date.getHours())-12); return (tmp < 10 ? "0":"" )+tmp; break;
            case "H": return (date.getHours() < 10 ? "0" : "" )+date.getHours(); break;
            case "i": return (date.getMinutes() < 10 ? "0" : "" )+date.getMinutes(); break;
            case "s": return (date.getSeconds() < 10 ? "0" : "" )+date.getSeconds(); break;
            case "D": return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][date.getDay()]; break;
            case "l": return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()];
            case "DD": return ["일","월","화","수","목","금","토"][date.getDay()]; break;
            case "ll": return ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"][date.getDay()]; break;
            default : return word;
        }
    });
};

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

