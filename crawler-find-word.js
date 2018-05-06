var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var validUrl = require('valid-url');
var events = require('events');
var eventEmitter = new events.EventEmitter();   

var START_URL = "";
var SEARCH_WORD = "";
var MAX_PAGES_TO_VISIT = 0;
var ERR_MESSAGE = "";

var pagesVisited = [];
var pagesToVisit = [];
var pagesVisitedData = {};
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;


/* Start test section
    START_URL = "https://arstechnica.com/";
    SEARCH_WORD = "BBB";
    MAX_PAGES_TO_VISIT = 20;
    ERR_MESSAGE = "";
    pagesToVisit.push(START_URL);
    innerCrawl();
// End test section */

module.exports.pages = pagesVisited;
module.exports.eventHandler = eventEmitter;
module.exports.crawl = function(startUrl, searchWord, maxPagesToVisit) {

    START_URL = startUrl;
    SEARCH_WORD = searchWord;
    MAX_PAGES_TO_VISIT = maxPagesToVisit;
    
    pagesToVisit.push(START_URL); 

    innerCrawl();  
    
}

function innerCrawl() {
    
    validateArgs();

    var nextPage = pagesToVisit.pop();

    if(pagesVisited.length >= MAX_PAGES_TO_VISIT || nextPage == null) {
        //ERR_MESSAGE = "Visited page above max page to visit";
        eventEmitter.emit('done');
        return;
    }

    if (nextPage in pagesVisitedData) {
        // We've already visited this page, so repeat the innerCrawl
        innerCrawl();
    } else {
        // New page we haven't visited
        visitPage(nextPage, innerCrawl);
    }    
}

function validateArgs() {

    if(START_URL == "") {
        ERR_MESSAGE += "START_URL is empty.";
        throw ERR_MESSAGE;
    }
    
    if(SEARCH_WORD == "") {
        ERR_MESSAGE += "SEARCH_WORD is empty.";
        throw ERR_MESSAGE;
    }

    if(MAX_PAGES_TO_VISIT <=0 || MAX_PAGES_TO_VISIT >= 1000) {
        ERR_MESSAGE += "MAX_PAGES_TO_VISIT range values between 0 and 1000.";
        throw ERR_MESSAGE;
    }
}

function visitPage(url, callback) {

    // Add page to our set
    pagesVisitedData[url] = true;
    var d = {
            sitePath : url,
            isVisited : true,
            wordToFind : SEARCH_WORD,
            isWordFound : false,
            body : "",
            statusCode : "",
            err : "",
            data : ""
        };

    if (!validUrl.isUri(url)){
        d.err = url + " : Is not a valid Url , go to the next page";
        pagesVisited.push(d);
        //console.log(d);
        callback();
        return;
    }

    // Make the request
    //console.log("Visiting page " + url);
    request(url, function(error, response, body) {
        // Check status code (200 is HTTP OK)
        
        if(error != null && error != "") {
            d.err = 'Got an error ' + error + ' at page ' + url;
            pagesVisited.push(d);
            //console.log(d);
            callback();
            return;
        }

        d.statusCode = response.statusCode;

        if(response.statusCode !== 200) {
            d.err = 'Got an error ' + response.statusCode + ' at page ' + url;
            pagesVisited.push(d);
            //console.log(d);
            callback();
            return;
        }
        // Parse the document body
        var $ = cheerio.load(body);
        var isWordFound = searchForWord($, SEARCH_WORD);
        
        if(isWordFound) {
            d.isWordFound = true;
            d.body = body;
            d.data = "Word '" + SEARCH_WORD + "' found at page " + url;
        }

        collectInternalLinks($, d);
        // In this short program, our callback is just calling innerCrawl()
        pagesVisited.push(d);
        //console.log(d);
        callback();    
    }).end();
}

function searchForWord($, word) {
  var bodyText = $('html > body').text().toLowerCase();
  return(bodyText.indexOf(word.toLowerCase()) !== -1);
}

function collectInternalLinks($, d) {
    var relativeLinks = $("a[href^='/']");
    d.data = "Found " + relativeLinks.length + " relative links on page";
    relativeLinks.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });
}

