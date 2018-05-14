// 'use strict';

var expect = require('chai').expect;
var srv = require('../crawler-find-word');

var pagesVisited = [];
var save = function(){
    pagesVisited = srv.pages;
}

var noWord = function(){
    srv.crawl('https://cnn.com/', '', 2)
};

var noUrl = function(){
    srv.crawl('', 'just word', 2);
};

var noMaxPage = function(){
    srv.crawl('https://cnn.com/', 'just word', 0)
};


var knownPageGetData = function(){
        var u = srv.pages.pop();               
        if(u.isWordFound)
            throw 'Word Found';
        else
            throw 'Word did not Found';
};

var knownPageWithMatch = function(){
    srv.eventHandler.on('done', knownPageGetData);
    srv.crawl('https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71', 'Mocha', 1)
};

var knownPageNoMatch = function(){
    srv.eventHandler.on('done', knownPageGetData);
    srv.crawl('https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71', 'xxx', 1)
};


srv.eventHandler.on('done', save);

describe('#crawler-service', function() {
    it('should no word to find throw exception', function() {

        expect(noWord).to.throw("SEARCH_WORD is empty."); 
    });

    it('should no path to dig throw exception', function() {

        expect(noUrl).to.throw("START_URL is empty."); 
    });

    it('should no value for max pages to visit throw exception', function() {

        expect(noMaxPage).to.throw("MAX_PAGES_TO_VISIT range values between 0 and 1000."); 
    });

    it('should be match for the page and the phrase', function() {
        
        setTimeout( function () {            
            try {
                expect(knownPageWithMatch).to.throw("Word Found")
            } catch( e ) {
                
            }
        }, 1000 );
    });

    it('should be match for the page but no for the phrase', function() {

        setTimeout( function () {            
            try {
                expect(knownPageNoMatch).to.throw("Word did not Found");
            } catch( e ) {
            
            }
        }, 1000 );
        
    });
});