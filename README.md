## Simple but powerful crawler - find phrase deep in the web

[![Build Status](https://travis-ci.org/idangvili/crawler-find-word.svg?branch=master)](https://travis-ci.org/idangvili/crawler-find-word)

## Description

Deep crawl to find word in the body of web pages by base url
Simple but powerful, popular and production crawling/scraping package for Node.

## Features:

Configurable level of maximum pages to visit
Configurable root URL and Word to search
Use event driven API, Raise 'Done' event when process ends.
Return usefull statistical data.
Use Cheerio to find word or phrase in the DOM.
Tested with Mocha and Chai

## Future features

Add 'Error' event handling.
Priority queue of requests.
Control rate limit.
Charset detection and conversion.

## Demo

```node

 'use strict';
 var srv = require('crawler-find-word'); 
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

```

## Run 

Running `nodemon ./crawler-service.js localhost 3000` will run the unit tests with debug mode.

## Test 

Running `npm test` will test.