var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');


var url = 'https://www.reddit.com/r/malefashionadvice/comments/me39q/shujins_unofficial_noncomprehensive_approved/';

/*request(url, function(err, response, html){
    if(err){
        throw err;
    }else{
        var $ = cheerio.load(html);
        var brandsString = "";

        var i=0;
        $('.md li').filter(function(){
            var data = $(this);
            i++;
            if(i>38 && i!=566)
                brandsString += data.text() + '\n';
        });


        fs.writeFile('./text-files/reddit-thread.txt', brandsString, function(err){
            if(err){
                throw err;
            }else{
                console.log("Brands imported.");
            }
        });

    }
});*/






















