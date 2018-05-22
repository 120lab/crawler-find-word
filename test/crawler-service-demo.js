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

var knownPageGetData = function(){
    var u = srv.pages.pop();               
    if(u.isWordFound)
        throw new exception('Word Found');
    else
        throw new exception('Word did not Found');
};

srv.eventHandler.on('done', print);
srv.crawl('https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71', 'Mocha', 1);
