var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');


var url = 'https://en.wikipedia.org/wiki/Category:Clothing_brands';
request(url, function(err, response, html){
    if(err){
        throw err;
    }else{
        var $ = cheerio.load(html);
        var brands = [];

        $('.mw-category li').filter(function(){
            var data = $(this);
            console.log(data.children().text());
            brands.push(data.children().text());
        });

        var brandsString = "";
        brands.forEach(function(brand){
            brandsString += brand + '\n';
        });

        fs.writeFile('./text-files/wiki.txt', brandsString, function(err){
            if(err){
                throw err;
            }
        });
    }
});

