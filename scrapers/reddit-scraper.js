var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');


var url = 'https://docs.google.com/spreadsheets/d/1tNl6Fj1KPR7Ssmvw6ElhhZDsmVhd5HvRuqhuNmbUjS8/pub?output=html';

request(url, function(err, response, html){
    if(err){
        throw err;
    }else{
        var $ = cheerio.load(html);
        var brandsString = "";

        $('tr').filter(function(){
            var data = $(this);
            data = data.children().eq(2).text().trim();
            if(data != 'STORE NAME'){
                brandsString += data + '\n';
            }
        });

        fs.writeFile('./text-files/reddit-spreadsheet.txt', brandsString, function(err){
            if(err){
                throw err;
            }else{
                console.log("Brands imported.");
            }
        });
    }
});






















