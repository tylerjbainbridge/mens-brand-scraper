var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');


var url = 'http://shop.nordstrom.com/c/mens-brands';
request(url, function(err, response, html){
   if(err){
       throw err;
   }else{
       var $ = cheerio.load(html);
       var brands = [];

       $('.col-1 li').filter(function(){
           var data = $(this);
           console.log(data.children().text());
           brands.push(data.children().text());
       });

       $('.col-2 li').filter(function(){
           var data = $(this);
           console.log(data.children().text());
           brands.push(data.children().text());
       });

       $('.col-3 li').filter(function(){
           var data = $(this);
           console.log(data.children().text());
           brands.push(data.children().text());
       });

       var brandsString = "";
       brands.forEach(function(brand){
          brandsString += brand + '\n';
       });

       fs.writeFile('./text-files/nordstrom.txt', brandsString, function(err){
           if(err){
               throw err;
           }
       });
   }
});