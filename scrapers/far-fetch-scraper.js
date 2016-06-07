var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');


var url = 'http://www.farfetch.com/designers-men.aspx';
request(url, function(err, response, html){
    if(err){
        throw err;
    }else{
        var $ = cheerio.load(html);
        var brands = [];

        $('.list-regular li').filter(function(){
            var data = $(this);
            console.log(data.children().text());
            brands.push(data.children().text());
        });

        var brandsString = "";
        brands.forEach(function(brand){
            brandsString += brand + '\n';
        });

        fs.writeFile('./text-files/far-fetch.txt', brandsString, function(err){
            if(err){
                throw err;
            }
        });
    }
});

