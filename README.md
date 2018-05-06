## crawler-find-phrase

[![Build Status](https://travis-ci.org/idangvili/crawler-find-word.svg?branch=master)](https://travis-ci.org/idangvili/crawler-find-word)

## Description

Deep crawl to find word in the body of web pages by base url

## Demo

### 'use strict';
### var srv = require('crawler-find-word'); 
### var print = function(){
###     var count = srv.pages.length;
###     for(var i=0; i < count; ){
###         var u = srv.pages.pop();               
###         console.log(JSON.stringify(u));
###         i++;
###     };
### }
### 
### srv.eventHandler.on('done', print);
### srv.crawl('https://cnn.com/', 'trump', 2);

## Run 

Running `nodemon ./crawler-service.js localhost 3000` will run the unit tests with debug mode.

## Test 

Running `npm test` will test.