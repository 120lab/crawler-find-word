## Simple but powerful crawler - find phrase deep in the web

[![Build Status](https://travis-ci.org/idangvili/crawler-find-word.svg?branch=master)](https://travis-ci.org/idangvili/crawler-find-word)

## Description

Deep crawl to find word in the body of web pages by base url.    
Simple but powerful, popular and production crawling/scraping package for Node.    

We strict about our code , so, we choose to use 'travis-ci' and 'npm audit'.

Review bugs you found or feature you want in our Slack click this Slack [invitation](https://join.slack.com/t/crawler-find-word/shared_invite/enQtMzYyOTcyNjE5MDEzLTc4NWM3Y2QyZmNiMWY5OWJhMGVkMzNlZWEyOGQ2NWVjMmMwMjFlZWUyNDkwOTRkZmVmMjIxZDMzNjU0ZTdhZWU)

## Features:

Configurable level of maximum pages to visit.  
Configurable root URL and Word to search.  
Use event driven API, Raise 'Done' event when process ends.  
Return usefull statistical data. 
Enable Docker hosting  
Use Cheerio to find word or phrase in the DOM.  
Tested with Mocha and Chai.  

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

Running `nodemon ./crawler-find-word.js localhost 3000` will run the unit tests with debug mode.

## Test 

Run the command `npm test` for Mocha & Chai testing unit.

## Deploy to Docker

Run command to build Docker image from the project directory 
`docker build -t node-crawler-dev-env .`


Run command to create Docker instance 
`docker container run -p 9999:80 --name node-crawler-app --rm -v local-drive:/usr/src/app node-crawler-dev-env:latest`


