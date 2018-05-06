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

srv.eventHandler.on('done', save);

describe('#crawler-service', function() {
    it('should no word to find throw exception', function() {

        expect(noWord).to.throw("SEARCH_WORD is empty."); 
    });
});

describe('#crawler-service', function() {
    it('should no path to dig throw exception', function() {

        expect(noUrl).to.throw("START_URL is empty."); 
    });
});

describe('#crawler-service', function() {
    it('should no value for max pages to visit throw exception', function() {

        expect(noMaxPage).to.throw("MAX_PAGES_TO_VISIT range values between 0 and 1000."); 
    });
});
