'use strict';
var srv = require('../crawler-find-word');

var print = function(){
    var count = srv.pages.length;
    for(var i=0; i < count; ){
        var u = srv.pages.pop();               
        console.log(JSON.stringify(u));
        i++;
    };
}

srv.eventHandler.on('done', print);
srv.crawl('https://cnn.com/', 'trump', 2);
