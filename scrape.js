const exec = require('child_process').exec;
var async = require('async');

var commands = [
    'far-fetch-scraper',
    'nd-scraper',
    'reddit-scraper',
    'reddit-scraper',
    'wiki-scraper'
];


async.each(commands, executeScraper, function(err){
   exec('node main', function(error, stdout, stderr) {
       if (err) {
           console.error("An error occurred: ", error);
       }else{
           console.log("Scraping Complete.\n", stdout);
       }
   });
});

function executeScraper (command, callback){
    exec('node ./scrapers/' + command, function(error, stdout, stderr) {
        if (error) {
            console.error("exec error: ", error);
            return;
        }
        callback(error);
    });
}

